import { Redirect } from "react-router";
import SignPage from "../../pages/Sign/SignPage";


export default function PrivateRoutes({children} : any) {
    
    const auth = { token: true };

    return (
        auth.token ? children : <Redirect to="/" />
    );
}