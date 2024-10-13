import { useEffect, useState } from "react";
import { supabaseClient } from "../../lib/supabaseClient";
import "./Home.css"
import { Recipes } from "../../Types/supabase-own-types";
import Popular from "../../Components/Popular/Popular";
import { Link } from "react-router-dom";
import Hero from "../../Components/Hero/Hero";

const Home = () => {

    const [recipes, setRecipes] = useState<Recipes[]>();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [noSearchResultText, setNoSearchResultText] = useState<string>("");

    useEffect(() => {
        const fetchRecipes = async () => {
            let selectQuery = supabaseClient.from("Recipes").select("*").order("created_at", {ascending:false});

            if(searchTerm){
                selectQuery = selectQuery.ilike("name", `%${searchTerm}%`)
            }

            const result = await selectQuery;

            if(result.data?.length === 0){
                setNoSearchResultText("Die Suche war erfolglos...")
            } else{
                setNoSearchResultText("");
            }

            if (result.error) {
                console.error(result.error);
            } else {
                setRecipes(result.data);
            }
        }
        fetchRecipes();
        
    }, [searchTerm]);

    return ( 
    <main>
        <Hero />
        <div className="content-wrapper">
        <Popular />
        
        {!recipes? <p>Sorry, no recipes found.</p> :
        <div className="show-recipe-container">
            <h2>{!searchTerm? "Neueste Rezepte" : "Deine Suchergebnisse"}</h2>
            <p className="no-search-results-text">{noSearchResultText}</p>
            <div className="searchbar-container">
            <input type="text" id="recipe-search-input" placeholder="Nach Rezepten suchen..." value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
        </div>
    {recipes?.map((recipe) => (
        <Link to={`/recipe/${recipe.id}`}>
        <div className="recipe-card-horizontal" key={recipe.id}>
            
        <div className="recipe-card-horizontal-img-container">
        <img src={`${recipe.img_url}`} />
        </div>
        <div className="recipe-card-horizontal-text-container">
        <h3>{recipe.name}</h3>
        <p>Rating: {recipe.rating}</p>
        <p>{recipe.description.split(" ").slice(0,30).join(" ")} ...</p>
        
        <button className="btn see-more-btn">zum Rezept</button>
        </div>
        </div>
        </Link>
    ))}
    </div>
    }</div>
    </main> 
    );
}

export default Home;
