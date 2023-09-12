import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './Modals.scss';
import ModalConfirm from './ModalConfirm';
import * as yup from 'yup';
import { Formik } from 'formik';
import { resetPassword } from '../../services/api/user';

const ModalResetPassword = () => {
    const [onShow, setOnShow] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    
    const handleShow = () => { setShow(true) };

    const handleShow2 = () => {
        setOnShow(true);
        setShow(false)
    };

    const handleClose2 = () =>  {
        setOnShow(false);
    }

    const schema = yup.object().shape({
        email: yup.string()
            .email("L'email n'a pas le format attendu. 'exemple@gmail.com'")
            .required('Ce champs est obligatoire !'),
    })

    const handleSubmit = async (values: any) => {
        try {
            await resetPassword(values.email)
            handleShow2()
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'e-mail:", error)
        }
    }
    
return (
        <>
        <Button variant="ternary" onClick={handleShow}>
            Mot passe oublié ?
        </Button>

        <Modal 
            show={show} 
            onHide={handleClose}
            className="modal"
        >
            <Modal.Header closeButton className="modal-header">
                <Modal.Title>Mot de passe oublié !</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Formik
                validationSchema={schema}
                onSubmit={handleSubmit}
                initialValues={{
                    email: ''
                }}
            >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form onSubmit={handleSubmit}>
                    <p>
                        Entrez votre email afin que nous
                        puissions vous envoyer un email
                        avec un lien de réinitialisation de 
                        mot de passe
                    </p>
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

                    <Button className='form-send' type="submit">
                        Envoyer un email
                    </Button>
                </Form>
                )}
            </Formik>
            </Modal.Body>
            <Modal.Footer className='modals-footer'>
                <Button variant="cancel" onClick={handleClose}>
                    Annuler
                </Button>
            </Modal.Footer>
        </Modal>
        <ModalConfirm showModal={onShow} onClose={handleClose2}/>
        </>
    )
}

export default ModalResetPassword
