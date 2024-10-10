import { useEffect, useState } from "react";
import { supabaseClient } from "../../lib/supabaseClient";
import { Recipes } from "../../Types/supabase-own-types";
import "./Popular.css"


const Popular = () => {

    const [popularRecipes, setPopularRecipes] = useState<Recipes[]>();

    useEffect(() => {
        const fetchPopularRecipes = async () => {
            let popularQuery = supabaseClient.from("Recipes").select("*").eq("rating", 5).limit(3);

            const result = await popularQuery;

            if (result.error){
                console.error(result.error);
            } else{
                setPopularRecipes(result.data);
            }
        }
        fetchPopularRecipes();
    }, [])

    return ( 
        <div className="popular-container">
            {popularRecipes?.map((recipe) =>
            <div className="popular-card" key={recipe.id}>
                <div className="popular-card-img-container">
                <img src={`${recipe.img_url}`} />
                </div>
                <div className="popular-card-text-container">
                <h2>{recipe.name}</h2>
                <p>Rating: {recipe.rating}</p>
                <p>{recipe.description}</p>
                <button className="btn see-more-btn">zum Rezept</button>
                </div>
            </div>
            )}
        </div>
     );
}

export default Popular;

{/* kann ein fetch als context genutzt werden --> selectQuery gespeichert werden und dann mit weiteren if Abfragen modifiziert werden??? */}