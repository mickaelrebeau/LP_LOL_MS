import FormConnect from "../../components/Form/FormConnect";
import { useState } from 'react';
import './AuthPage.css'


const AuthPage = ({ handleAddTokens }: any) => {
    const [isLogin, setIslogin] = useState(true);

    return (
        <div className="auth">
            <div className="auth-link mx-auto">
                <button className="signin" onClick={() => setIslogin(true)}>Inscription</button>
                <button className="signup" onClick={() => setIslogin(false)}>Connexion</button>
            </div>
            <FormConnect isLogin={isLogin} handleAddTokens={handleAddTokens} />
        </div>
    );
};

export default AuthPage;