import { useEffect, useState } from "react";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import { supabaseClient } from "../../lib/supabaseClient";
import "./Home.css"
import { Recipes } from "../../Types/supabase-own-types";


const Home = () => {

    const [recipes, setRecipes] = useState<Recipes[]>();

    useEffect(() => {
        const fetchRecipes = async () => {
            let selectQuery = supabaseClient.from("Recipes").select("*");

            const result = await selectQuery;

            if (result.error) {
                console.error(result.error);
            } else {
                setRecipes(result.data);
                console.log(recipes)
            }
        }
        fetchRecipes();
    }, []);

    return ( 
    <>
    <Header />
    <Footer />
    </> 
    );
}

export default Home;
