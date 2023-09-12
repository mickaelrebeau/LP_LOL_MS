import "./DetailsContactPage.css";
import { NavLink, useParams } from "react-router-dom";
import Data from "../../services/dataService";
import { useEffect, useState } from "react";
import { DataContacts } from "../../utils/Interfaces/DataContact.interface";
import ModalRequestData from "../../components/Modals/ModalRequestData";

const DetailsContactPage = () => {
  const { id } = useParams<{ id: string }>();
  const [showModal, setShowModal] = useState(false);
  const data = new Data();
  const [contactDetails, setContactDetails] = useState<DataContacts | null>(
    null
  );

  useEffect(() => {
    const fetchContactDetails = () => {
      const contact = id ? data.getcontact(id) : null;
      setContactDetails(contact as DataContacts | null); // ici contact seulement ne voulais pas marcher, obliger de cheat :-()
    };
    fetchContactDetails();
  }, [id]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  
  return (
    <>
      <div className="container d-flex flex-column align-items-center p-3 mt-5 mb-5">
        <div className="w-100 mb-4 ">
          <div className="info_title">
            <NavLink to="/home">
              <button className="button_retour">Retour</button>
            </NavLink>
            <h2>Informations</h2>
          </div>
        </div>

        {/* Information */}

        {contactDetails ? (
          <section className="detail_info">
            <div className="info_container">
              {contactDetails.pseudo && (
                <div className="info_row">
                  <span className="row_label">Pseudo</span>
                  <p className="row_data">{contactDetails.pseudo}</p>
                </div>
              )}
              {contactDetails.email && (
                <div className="info_row">
                  <span className="row_label">Email</span>
                  <p className="row_data">{contactDetails.email}</p>
                </div>
              )}
              {contactDetails.firstname && (
                <div className="info_row">
                  <span className="row_label">Prénom</span>
                  <p className="row_data">{contactDetails.firstname}</p>
                </div>
              )}
              {contactDetails.lastname && (
                <div className="info_row">
                  <span className="row_label">Nom de famille</span>
                  <p className="row_data">{contactDetails.lastname}</p>
                </div>
              )}
            </div>

            {/* Groupe */}

            <h2 className="text-center mb-4">Groupes</h2>
            <div className="groups_container">
              {contactDetails.groups && (
                <>
                  {contactDetails.groups.map((group: string, idx) => (
                    <div key={idx} className="group_tag">
                      <p className="mb-0 fw-bold">{group}</p>
                    </div>
                  ))}
                </>
              )}
            </div>

            {/* Données Partagées */}
            <h2 className="text-center mb-4">Données Partagées</h2>
            <div className="dataAdd_container">
              {contactDetails.data_add?.length ? (
                <>
                  {contactDetails.data_add.map(
                    (add: { [key: string]: string }) =>
                      Object.entries(add).map(([key, value]) => (
                        <div key={key} className="info_row">
                          <span className="row_label">{key}</span>
                          <p className="row_data">{value}</p>
                        </div>
                      ))
                  )}
                </>
              ) : (
                <p className="text-center fst-italic">
                  aucune autre données partagées...
                </p>
              )}
            </div>
          </section>
        ) : (
          <p>Chargement des détails du contact...</p>
        )}
        {/* Bouttons */}
        <div>
          <button className="button_partage" onClick={handleOpenModal}>
            Demande d'une donnée temporaire
          </button>

          <ModalRequestData showModal={showModal} onClose={handleCloseModal} />
          <button className="button_supp">Supprimer le contact</button>
        </div>
      </div>
    </>
  );
};

export default DetailsContactPage;
