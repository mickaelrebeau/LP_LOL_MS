/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Form } from 'react-bootstrap';
import './ProfilPage.css';
import ModalSecurity from '../../components/Modals/ModalSecurity';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { authorizationProfil, updateProfil } from '../../services/api/user';
import * as formik from 'formik';
import * as yup from 'yup';
import FormPresetData from '../../components/Form/FormPresetData';
import FormEditData from '../../components/Form/FormEditData';


const ProfilPage = ({user_id}: any) => {
    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        pseudo: ''
    });

    const [isDisable, setIsDisable] = useState(true);
    
    // @ts-ignore
    const refresh = () => window.location.reload(true)

    //@ts-ignore
    const [confirmationMessage, setConfirmationMessage] = useState<string>('');

    const schema = yup.object().shape({
        firstname: yup.string()
            .min(3, "Entrez un minimum de 3 caractères.")
            .max(50, "Veillez entrez au maximun 50 caractères."),
        lastname: yup.string()
            .min(3, "Entrez un minimum de 3 caractères.")
            .max(50, "Veillez entrez au maximun 50 caractères."),
        pseudo: yup.string()
            .min(3, "Entrez un minimum de 3 caractères.")
            .max(50, "Veillez entrez au maximun 50 caractères."),
    });

    useEffect(() => {
        console.log(user_id)
        authorizationProfil()
        .then((userDatas) => {
            setUser({
                firstname: userDatas?.data.datas.firstname,
                lastname: userDatas?.data.datas.lastname,
                pseudo: userDatas?.data.datas.pseudo
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    const handleToggleEdit = async () => {
        setIsDisable(false)
    };

    const handleToggle = () => {
        setIsDisable(true)
    }

    const handleSubmit = async (values: {
        firstname: string, lastname: string, pseudo: string
    }) => {
        try {
            const updatedData = {
                firstname: values.firstname !== '' ? values.firstname : user.firstname,
                lastname: values.lastname !== '' ? values.lastname : user.lastname,
                pseudo: values.pseudo !== '' ? values.pseudo : user.pseudo
            };

            await updateProfil(updatedData);
            
            setUser({
                firstname: values.firstname,
                lastname: values.lastname,
                pseudo: values.pseudo
            })

            // setConfirmationMessage('Profil mit à jour avec succès !')
            setIsDisable(true);
            // refresh()
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
        <div className='card p-5 m-5'>
            <div className='d-flex justify-content-between mb-5'>
                <Button className='back' variant='secondary'>
                    <Link className='return' to="/">Retour</Link>
                </Button>

                <h1>Mon Profil</h1>
            </div>
            {isDisable ? 
                <Form>
                    <ModalSecurity/>

                    <Form.Group className="auth-input" controlId="firstname">
                        <Form.Label>Prénom</Form.Label>
                        <Form.Control
                            type="text" 
                            placeholder={user.firstname} 
                            name="firstname"
                            disabled />
                    </Form.Group>

                    <Form.Group className="auth-input" controlId="lastname">
                        <Form.Label>Nom de famille</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder={user.lastname} 
                            name="lastname"
                            disabled />
                    </Form.Group>

                    <Form.Group className="auth-input" controlId="pseudo">
                        <Form.Label>Pseudo</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder={user.pseudo} 
                            name="pseudo"
                            disabled />
                    </Form.Group>

                    <Button className='security mt-3' onClick={handleToggleEdit}>Editer</Button>
                </Form> 
                
                :
                <formik.Formik
                    validationSchema={schema}
                    onSubmit={handleSubmit}
                    initialValues={{
                        firstname: user.firstname,
                        lastname: user.lastname,
                        pseudo: user.pseudo
                    }}
                >
                    {({ handleSubmit, handleChange, values, touched, errors }) => (
                    <Form onSubmit={handleSubmit}>
                        <ModalSecurity/>

                        <Form.Group className="auth-input" controlId="firstname">
                            <Form.Label>Prénom</Form.Label>
                            <Form.Control
                                type="text" 
                                placeholder={user.firstname} 
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
                                placeholder={user.lastname} 
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
                                placeholder={user.pseudo} 
                                name="pseudo"
                                value={values.pseudo}
                                onChange={handleChange}
                                isValid={touched.pseudo && !errors.pseudo}
                                isInvalid={!!errors.pseudo} />
                            <Form.Control.Feedback type="invalid">
                                {errors.pseudo}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button type="submit" className="auth-button">Mettre à jour</Button>
                        <Button className="auth-button" variant="cancel" onClick={handleToggle}>Annuler</Button>
                        {confirmationMessage && (
                            <div className="confirm-msg">{confirmationMessage}</div>
                        )}
                    </Form>
                    )}
                </formik.Formik>
            }           
        </div>
        <div>
        <FormEditData user_id={user_id} />
        <FormPresetData user_id={user_id} />
        </div>
        
        </div>
    );
};

export default ProfilPage;