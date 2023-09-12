import { Button, Form } from 'react-bootstrap';
import './SecurityPage.css'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { authorizationProfil, updateEmailAndOrPassword, updateUserEmail, updateUserPassword } from '../../services/api/user';
import {useState} from 'react';

const SecurityPage = ({user_id}: any) => {

     const [email, setEmail] = useState<string>("");
     const [isEdit, setIsEdit] = useState<boolean>(false)

    useEffect(() => {
        authorizationProfil()
        .then((res) => {
            console.log(res);
            setEmail(res?.data.datas.email);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    const toggleEdit = () => {
        setIsEdit(!isEdit)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        //@ts-ignore
        const newEmail = e.target[0].value;
        //@ts-ignore
        const confirmEmail = e.target[1].value;
        //@ts-ignore
        const password = e.target[2].value;
        //@ts-ignore
        const confirmPassword = e.target[3].value;
        //@ts-ignore
        const errEmail = document.querySelector('.err-email');
        //@ts-ignore
        const errConfirmEmail = document.querySelector('.err-confirm-email');
        //@ts-ignore
        const errPassword = document.querySelector('.err-password');
        //@ts-ignore
        const errConfirmPassword = document.querySelector('.err-confirm-password');
        //@ts-ignore
        errEmail.innerHTML= "";
        //@ts-ignore
        errConfirmEmail.innerHTML= "";
        //@ts-ignore
        errPassword.innerHTML= "";
        //@ts-ignore
        errConfirmPassword.innerHTML= "";
        if (newEmail !== email) {
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            const isValidEmail = emailRegex.test(newEmail);
            if (isValidEmail) {
                if (newEmail === confirmEmail) {
                    if (!password) {
                        const data = {
                            userId: user_id,
                            email: newEmail
                        }
                        updateEmailAndOrPassword(data)
                        .then((res) => {
                            console.log(res)
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                    } else {
                        if (password.length >= 8) {
                            if (password === confirmPassword) {
                                const data = {
                                    userId: user_id,
                                    email: newEmail,
                                    password
                                }
                                updateEmailAndOrPassword(data)
                                .then((res) => {
                                     console.log(res)
                                })
                                .catch((err) => {
                                    console.log(err)
                                });
                            } else {
                                e.preventDefault();
                                //@ts-ignore 
                                errConfirmPassword.innerHTML = "Les mot de passes ne correspond pas!"
                            }
                        } else {
                            e.preventDefault();
                            //@ts-ignore 
                            errPassword.innerHTML = "Le mot de passe doit contenir au moins 8 caractères!"
                        }
                    }
                } else {
                    e.preventDefault();
                    //@ts-ignore
                    errConfirmEmail.innerHTML = "Les emails ne correspondent pas!"
                }
            } else {
                e.preventDefault();
                //@ts-ignore
                errEmail.innerHTML = "Format d'email incorrect!"
            }
        } else {
            if (!password) {
                e.preventDefault();
                //@ts-ignore
                errConfirmPassword.innerHTML = "Aucune modification ajouté !"
            } else {
                if( password.length >= 8) {
                    if (password === confirmPassword) {
                        const data = {
                            userId: user_id,
                            password
                        }
                        updateEmailAndOrPassword(data)
                        .then((res) => {
                            console.log(res);
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                    } else {
                        e.preventDefault();
                         //@ts-ignore 
                         errConfirmPassword.innerHTML = "Les mot de passes ne correspond pas!"
                    }
                } else {
                    e.preventDefault();
                     //@ts-ignore 
                     errPassword.innerHTML = "Le mot de passe doit contenir au moins 8 caractères!"
                }
            }
        }
    }
    return (
        <div>
        <div className='card p-5 m-5'>
            <div className='d-flex justify-content-between mb-5'>
                <Button className='back' variant='secondary'>
                    <Link className='return' to="/">Retour</Link>
                </Button>

                <h1>Mon Profil</h1>
                </div>
                {!isEdit ?
                <Form>
                    <Form.Group className='auth-input' controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder={email}
                            value={email}
                            name='email'
                            disabled
                            readOnly
                        />
                    </Form.Group>
                    <Button className='security mt-3' onClick={toggleEdit}>Editer</Button>
                </Form>
                :
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <Form.Group className='auth-input' controlId='email'>
                        <Form.Label> Modifier votre Email</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder={email}
                            defaultValue={email}
                            name='email'
                            />
                    </Form.Group>
                    <p className='auth-input mess-err err-email'></p>
                    <Form.Group className='auth-input' controlId='confirm-email'>
                        <Form.Label>Confirmer votre email</Form.Label>
                        <Form.Control
                            type='text'
                            name='confirm-email'
                            />
                    </Form.Group>
                    <p className='auth-input mess-err err-confirm-email'></p>
                    <Form.Group className='auth-input' controlId='password'>
                        <Form.Label>Changer de mot de passe</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='votre nouveau mot de passe'
                            name='password'
                            />
                    </Form.Group>
                    <p className='auth-input mess-err err-password'></p>
                    <Form.Group className='auth-input' controlId='confirm-password'>
                        <Form.Label>Confirmez votre mot de passe</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='votre nouveau mot de passe'
                            name='confirm-password'
                            />
                    </Form.Group>
                    <p className='auth-input mess-err err-confirm-password'></p>
                    <Button type='submit' className='auth-button'>Mettre à jour</Button>
                    <Button className='auth-button' onClick={toggleEdit} variant='cancel'>Annuler</Button>
                </Form>
                }
        </div>
    </div>
    );
};

export default SecurityPage;