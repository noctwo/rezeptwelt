import { useEffect, useState } from "react";
import { supabaseClient } from "../../lib/supabaseClient";
import "./Home.css"
import { Recipes } from "../../Types/supabase-own-types";


const Home = () => {

    const [recipes, setRecipes] = useState<Recipes[]>();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [noSearchResultText, setNoSearchResultText] = useState<string>("");

    useEffect(() => {
        const fetchRecipes = async () => {
            let selectQuery = supabaseClient.from("Recipes").select("*");

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
        <div className="searchbar-container">
            <input type="text" id="recipe-search-input" placeholder="Nach Rezepten suchen..." value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
        </div>
        <p>{noSearchResultText}</p>
        {!recipes? <p>Sorry, no recipes found.</p> :
        <div className="show-recipe-container">
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
