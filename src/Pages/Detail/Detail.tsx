import { useParams } from "react-router-dom";
import "./Detail.css"
import { supabaseClient } from "../../lib/supabaseClient";
import { useEffect, useState } from "react";
import { Recipes } from "../../Types/supabase-own-types";
import Hero from "../../Components/Hero/Hero";

const Detail = () => {

    const {id} = useParams<{id:string}>();
    const [singleRecipe, setSingleRecipe] = useState<Recipes>();

    useEffect(() => {
        const fetchSingleRecipe = async () => {
            if (!id){
                console.error("No Recipe ID given");
                return;
            }

            const supabaseResponse = await supabaseClient
            .from("Recipes")
            .select("*")
            .eq("id", id)
            .single();

            if (supabaseResponse.error){
                console.error("Recipe not found in Database", supabaseResponse.error);
                return;
            }

            if (supabaseResponse.data) {
                setSingleRecipe(supabaseResponse.data);
                console.log(supabaseResponse.data)
            }
        };
        fetchSingleRecipe();
    }, [])

    return (
        <div className="detail-page-wrapper"> 
        <Hero imageUrl={singleRecipe?.img_url}/>
        <div className="content-wrapper">
        <div className="detail-container">
        <h2>{singleRecipe?.name}</h2>
        <p>{singleRecipe?.description}</p>
        <h3>...und so gehts:</h3>
        <p>{singleRecipe?.instructions}</p>
        </div>
        </div>
        </div>
    );
}

export default Detail;