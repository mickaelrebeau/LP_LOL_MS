import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './Modals.scss';
import * as yup from 'yup';
import { Formik } from 'formik';
import { checkPassword } from '../../services/api/user';
import { useNavigate } from 'react-router-dom';

const ModalSecurity = () => {
    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => { setShow(true) };

    const schema = yup.object().shape({
        password: yup.string()
            .required('Ce champs est obligatoire !'),
    })

    const handleSubmit = async (values: any) => {
        const response = await checkPassword(values);
      
        if (response) {
              setIsPasswordCorrect(true); 
        } else {
              setIsPasswordCorrect(false);
        }

        if (isPasswordCorrect) {
            navigate('/security')
        }
    }
    
return (
        <>
        <Button className='security' onClick={handleShow}>
            Paramètre de sécurité
        </Button>

        <Modal 
            show={show} 
            onHide={handleClose}
            className="modal"
        >
            <Modal.Header closeButton className="modal-header">
                <Modal.Title>Paramètre de sécurité</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Formik
                validationSchema={schema}
                onSubmit={handleSubmit}
                initialValues={{
                    password: ''
                }}
            >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form onSubmit={handleSubmit}>
                    <p>
                        Entrez votre mot de passe afin d'accéder aux paramètre de sécurité de votre compte.
                    </p>
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

                    <Button className='form-send' type="submit">
                        Confirmer le mot de passe
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
        </>
    )
}

export default ModalSecurity