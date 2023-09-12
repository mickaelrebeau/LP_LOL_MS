import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./RequestPage.css";
import Data from "../../services/dataService";
import ModalConfirmAddContact from "../../components/Modals/ModalConfirmAddContact";
import { ModalStates } from "../../utils/Interfaces/Modal.interface"

const RequestPage = () => {
  const data = new Data();
  const requestDataContact = data.getRequestContact();
  const requestData = data.getRequestData();

  const [modalStates, setModalStates] =  useState<ModalStates>({});

  const [requestContactData, setRequestContactData] =
    useState(requestDataContact);
  const [requestDataAdd, setRequestDataAdd] = useState(requestData);
  const [acceptedRequestId, setAcceptedRequestId] = useState<number | null>(null);

  const handleRefuseClick = (requestId: number) => {
    const updatedData = requestContactData.filter(
      (request) => request.id !== requestId
    );
    setRequestContactData(updatedData);
  };

  const handleDeleteClick = (requestId: number) => {
    const updatedData = requestDataAdd.filter(
      (request) => request.id !== requestId
    );
    setRequestDataAdd(updatedData);
  };

  const handleOpenModal = (requestId: number) => {
    setAcceptedRequestId(requestId);
    setModalStates((prevStates) => ({
      ...prevStates,
      [requestId]: true,
    }));
  };

  const handleCloseModal = (requestId: number) => {
    setModalStates((prevStates) => ({
      ...prevStates,
      [requestId]: false,
    }));
  
    if (acceptedRequestId !== null) {
      handleRefuseClick(acceptedRequestId);
      setAcceptedRequestId(null);
    }
  };

  return (
    <>
      <div className="container d-flex flex-column align-items-center p-3 mt-5 mb-5 ">
        <div className="w-100 mb-4 ">
          <div className="request_title">
            <NavLink to="/home">
              <button className="button_retour">Retour</button>
            </NavLink>
            <h1>Demandes en cours</h1>
          </div>
        </div>

        <h2 className="mt-5 mb-3">Demande d'ajouts</h2>
        <section className="request_contact">
          {requestContactData.length > 0 ? (
            <>
              {requestContactData.map((request) => (
                <div key={request.id} className="request_card">
                  <h3 className="card_title">Demande d'ajout</h3>
                  <p>Ce contact souhaite vous ajouter dans son répertoire.</p>
                  <p className="fw-bold">{request.pseudo}</p>
                  <p className="">{request.email}</p>
                  <div className="card_button">
                    <button
                      className="button_accepter"
                      onClick={() => handleOpenModal(request.id)}
                    >
                      Accepter
                    </button>
                    <ModalConfirmAddContact
                      showModal={modalStates[request.id] || false}
                      onClose={() => handleCloseModal(request.id)}
                      
                    />
                    <button
                      className="button_refuser"
                      onClick={() => handleRefuseClick(request.id)}
                    >
                      Refuser
                    </button>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p> Vous n'avez pas de demande d'ajout actuellement...</p>
          )}
        </section>

        <h2 className="mt-5 mb-3">Demandes de données</h2>
        <section className="request_notification">
          {requestDataAdd.length > 0 ? (
            <>
              {requestDataAdd.map((request) => (
                <div key={request.id} className="notification_card">
                  <h3 className="notification_title">Demande de données</h3>
                  <p className="fw-bold">{request.pseudo}</p>
                  <p className="">{request.email}</p>
                  <div className="card_container">
                    <span>{request.request}</span>
                  </div>
                  <button
                    className="button_supprimer"
                    onClick={() => handleDeleteClick(request.id)}
                  >
                    Supprimer
                  </button>
                </div>
              ))}
            </>
          ) : (
            <p> Vous n'avez pas de demande de données actuellement...</p>
          )}
        </section>
      </div>
    </>
  );
};

export default RequestPage;
