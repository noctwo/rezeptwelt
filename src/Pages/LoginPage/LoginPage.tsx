import { useState } from "react";
import "./LoginPage.css"
import { useNavigate } from "react-router-dom";
import { supabaseClient } from "../../lib/supabaseClient";


const LoginPage = () => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");

    const navigate = useNavigate();

    return ( 
        <div className="login-container">
            <p>login</p>
        </div>
    );
}

export default LoginPage;