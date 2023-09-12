/* eslint-disable @typescript-eslint/ban-ts-comment */
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Form.css';
import ModalResetPassword from '../Modals/ModalResetPassword';
import { login, signup } from '../../services/api/user';
import * as formik from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
// import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useState } from 'react';


interface FormConnectProps {
    handleAddTokens: (token: string, refreshToken: string, user_id: string) => void;
    isLogin: boolean;
}

const FormConnect: React.FC<FormConnectProps> = (props) => {
    // @ts-ignore
    // eslint-disable-next-line prefer-const
    let { handleAddTokens, isLogin } = props

    const navigate = useNavigate();

    const { Formik } = formik;

    const [confirmationMessage, setConfirmationMessage] = useState<string>('');

    const signUpSchema = yup.object().shape({
        firstname: yup.string()
            .required('Ce champs est obligatoire !')
            .min(3, "Entrez un minimum de 3 caractères.")
            .max(50, "Veillez entrez au maximun 50 caractères."),
        lastname: yup.string()
            .required('Ce champs est obligatoire !')
            .min(3, "Entrez un minimum de 3 caractères.")
            .max(50, "Veillez entrez au maximun 50 caractères."),
        pseudo: yup.string()
            .required('Ce champs est obligatoire !')
            .min(3, "Entrez un minimum de 3 caractères.")
            .max(50, "Veillez entrez au maximun 50 caractères."),
        email: yup.string()
            .email("L'email n'a pas le format attendu. 'exemple@gmail.com'")
            .required('Ce champs est obligatoire !'),
        repeatEmail: yup.string()
            .oneOf([yup.ref('email')],"Les emails ne correspondent pas.")
            .required('Ce champs est obligatoire !'),
        password: yup.string()
            .required('Ce champs est obligatoire !')
            .min(8, "Entrez un minimum de 8 caractères."),
        repeatPassword: yup.string()
            .oneOf([yup.ref('password')],"Les mots de passe ne correspondent pas.")
            .required('Ce champs est obligatoire !'),
        terms: yup.bool()
            .required('Ce champs est obligatoire !')
            .oneOf([true], "Vous devez accepter les termes et conditions d'utilisations pour continuer"),
    });

    const LoginSchema = yup.object().shape({
        email: yup.string()
            .email("L'email n'a pas le format attendu. 'exemple@gmail.com'")
            .required('Ce champs est obligatoire !'),
        password: yup.string()
            .required('Ce champs est obligatoire !')
            .min(2, "Entrez un minimum de 2 caractères."),
    })

    const handleSubmitSignUp = async (values: {
        firstname: string, lastname: string, pseudo: string, email: string, password: string 
    }) => {
        const { firstname, lastname, pseudo, email, password } = values

        const signUpData = { firstname, lastname, pseudo, email, password }
        console.log(signUpData);
        
        const response = await signup(signUpData);

        if (response) {
            setConfirmationMessage('Utilisateur créé avec succès !');
            isLogin = true
        }
    }

    const handleSubmitLogin = async (values: {
         email: string, password: string
    }) => {
        const { email, password} = values

        const user = { email, password}
        console.log(user);
        
        const response = await login(user)

        if (response) {
            console.log(response.user._id);
            handleAddTokens(response.token, response.refreshToken, response.user._id);

            navigate('/home')
        }
       
    }

    return (
        <div className="formConnect">
            {isLogin ? (
                <>
                <Formik
                    validationSchema={signUpSchema}
                    onSubmit={handleSubmitSignUp}
                    initialValues={{
                        firstname: '',
                        lastname: '',
                        pseudo: '',
                        email: '',
                        repeatEmail: '',
                        password: '',
                        repeatPassword: '',
                        terms: false,
                    }}
                >
                    {({ handleSubmit, handleChange, values, touched, errors }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group className="auth-input" controlId="firstname">
                            <Form.Label>Prénom</Form.Label>
                            <Form.Control
                                type="text" 
                                placeholder="Prénom" 
                                name="firstname"
                                value={values.firstname}
                                onChange={handleChange}
                                isValid={touched.firstname && !errors.firstname}
                                isInvalid={!!errors.firstname}/>
                            <Form.Control.Feedback type="invalid">
                                {errors.firstname}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="auth-input" controlId="lastname">
                            <Form.Label>Nom de famille</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Nom de famille" 
                                name="lastname"
                                value={values.lastname}
                                onChange={handleChange}
                                isValid={touched.lastname && !errors.lastname}
                                isInvalid={!!errors.lastname} />
                            <Form.Control.Feedback type="invalid">
                                {errors.lastname}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="auth-input" controlId="pseudo">
                            <Form.Label>Pseudo</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Pseudo" 
                                name="pseudo"
                                value={values.pseudo}
                                onChange={handleChange}
                                isValid={touched.pseudo && !errors.pseudo}
                                isInvalid={!!errors.pseudo} />
                            <Form.Control.Feedback type="invalid">
                                {errors.pseudo}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="auth-input" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Email" 
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                isValid={touched.email && !errors.email}
                                isInvalid={!!errors.email} />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="auth-input" controlId="repeatEmail">
                            <Form.Label>Confirmation d'email</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Confirmation d'email" 
                                name="repeatEmail"
                                value={values.repeatEmail}
                                onChange={handleChange}
                                isValid={touched.repeatEmail && !errors.repeatEmail}
                                isInvalid={!!errors.repeatEmail} />
                            <Form.Control.Feedback type="invalid">
                                {errors.repeatEmail}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="auth-input" controlId="password">
                            <Form.Label>Mot de passe</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Mot de passe" 
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                isValid={touched.password && !errors.password}
                                isInvalid={!!errors.password} />
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="auth-input" controlId="repeatPassword">
                            <Form.Label>Confirmation de mot de passe</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Confirmation de mot de passe" 
                                name="repeatPassword"
                                value={values.repeatPassword}
                                onChange={handleChange}
                                isValid={touched.repeatPassword && !errors.repeatPassword}
                                isInvalid={!!errors.repeatPassword} />
                            <Form.Control.Feedback type="invalid">
                                {errors.repeatPassword}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="singup-text" controlId="terms">
                            <Form.Check 
                                type="checkbox" 
                                label="J'ai lu et j'acceptes les termes et conditions d'utilisations."
                                name="terms" 
                                onChange={handleChange}
                                isInvalid={touched.terms && !!errors.terms}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.terms}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button type="submit" className="auth-button">S'inscrire</Button>
                        {confirmationMessage && (
                            <div className="confirm-msg">{confirmationMessage}</div>
                        )}
                    </Form>
                    )}
                </Formik>
                </>
            ) : (
                <>
                <Formik
                    validationSchema={LoginSchema}
                    onSubmit={handleSubmitLogin}
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                >
                    {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="auth-input" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Email" 
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            isValid={touched.email && !errors.email}
                            isInvalid={!!errors.email} />
                        <Form.Control.Feedback type="invalid">
                            {errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="auth-input" controlId="password">
                        <Form.Label>Mot de passe</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Mot de passe" 
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            isValid={touched.password && !errors.password}
                            isInvalid={!!errors.password} />
                        <Form.Control.Feedback type="invalid">
                            {errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <div className='login-text'>
                        <Form.Group className="mb-3" controlId="loginCheck">
                            <Form.Check type="checkbox" label="Se souvenir de moi." name="loginCheck" />
                        </Form.Group>
                        <ModalResetPassword/>
                    </div>
                    <Button type="submit" className="auth-button">Se connecter</Button>
                </Form>
                )}
                </Formik>
                </>
            )}
        </div>
    );
};

export default FormConnect;
