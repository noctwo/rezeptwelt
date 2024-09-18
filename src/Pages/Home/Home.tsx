import { useEffect, useState } from "react";
import { supabaseClient } from "../../lib/supabaseClient";
import "./Home.css"
import { Recipes } from "../../Types/supabase-own-types";
import Popular from "../../Components/Popular/Popular";


const Home = () => {

    const [recipes, setRecipes] = useState<Recipes[]>();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [noSearchResultText, setNoSearchResultText] = useState<string>("");

    useEffect(() => {
        const fetchRecipes = async () => {
            let selectQuery = supabaseClient.from("Recipes").select("*").order("created_at", {ascending:false});

            if(searchTerm){
                selectQuery = selectQuery.ilike("name", `%${searchTerm}`)
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
        <Popular />
        <div className="searchbar-container">
            <input type="text" id="recipe-search-input" placeholder="Nach Rezepten suchen..." value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
        </div>
        {!recipes? <p>Sorry, no recipes found.</p> :
        <div className="show-recipe-container">
            <h2>{!searchTerm? "Neueste Rezepte" : "Deine Suchergebnisse"}</h2>
            <p>{noSearchResultText}</p>
    {recipes?.map((recipe) => (
        <div className="recipe-card" key={recipe.id}>
        <img src={`${recipe.img_url}`} />
        <p>{recipe.name}</p>
        
        </div>
    ))}
    </div>
    }
    </main> 
    );
}

export default Home;
