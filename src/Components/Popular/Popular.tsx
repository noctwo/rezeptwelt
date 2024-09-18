import { useEffect, useState } from "react";
import { supabaseClient } from "../../lib/supabaseClient";
import { Recipes } from "../../Types/supabase-own-types";


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
                <img src={`${recipe.img_url}`} />
                <p>{recipe.name}</p>
                <p>Rating: {recipe.rating}</p>
            </div>
            )}
        </div>
     );
}

export default Popular;

{/* kann ein fetch als context genutzt werden --> selectQuery gespeichert werden und dann mit weiteren if Abfragen modifiziert werden??? */}