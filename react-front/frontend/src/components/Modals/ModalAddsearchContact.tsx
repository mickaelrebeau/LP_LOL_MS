import "./Modals.scss";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { ModalProps } from "../../utils/Interfaces/Modal.interface";
import Data from "../../services/dataService";
import { DataContacts } from "../../utils/Interfaces/DataContact.interface";
import ModalConfirmContact from "./ModalConfirmContact";

const ModalAddsearchContact: React.FC<ModalProps> = ({
  showModal,
  onClose,
}) => {
  //data a changer
  const data = new Data();
  const contactsData = data.getSearchData();

  const [searchQuery, setSearchQuery] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); //gere la modal de confirmation
  const [showFirstModal, setShowFirstModal] = useState(true); //gere cette modal
  const [clickedContactIds, setClickedContactIds] = useState<number[]>([]); //gere l'id clicke

  //logique search bar
  const filterContacts = (contacts: DataContacts[], query: string) => {
    return contacts.filter(
      (contact) =>
        contact.pseudo.toLowerCase().includes(query.toLowerCase()) ||
        contact.email.toLowerCase().includes(query.toLowerCase())
    );
  };

  const filteredContacts = filterContacts(contactsData, searchQuery);

  //logique du boutton ajouter
  const handleContactClick = (contactId: number) => {
    setClickedContactIds((prevIds) => [...prevIds, contactId]);
    setShowConfirmationModal(true); // ouvre confirmation modal
    setShowFirstModal(false); // ferme la premiere modal
  };

  return showModal ? (
    <div>
      <Modal
        show={showFirstModal && showModal}
        onHide={onClose}
        className="modal"
      >
        <Modal.Header closeButton className="modal-header">
          <Modal.Title>Rechercher et ajouter un contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="input-group justify-content-center">
            <div className="form-outline">
              <input
                type="search"
                id="searchbar"
                placeholder="Pseudo / email"
                className="form-control"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button type="button" className="btn btn-primary">
              <div className="loupe_container">
                <div className="loupe_round--v2"></div>
                <div className="loupe_bar--v2"></div>
              </div>
            </button>
          </div>
          {searchQuery && filteredContacts.length > 0 ? (
            filteredContacts.map((contact) => (
              <div key={contact.id} className="mb-5 mt-5">
                <div className="card justify-content-center">
                  <h2 className="m-3">{contact.pseudo}</h2>
                  <p className="text-center">{contact.email}</p>
                  <button
                    className="two_button_see m-3"
                    onClick={() => handleContactClick(contact.id)}
                    disabled={clickedContactIds.includes(contact.id)}
                  >
                    {clickedContactIds.includes(contact.id)
                      ? "Demande envoyée"
                      : "Envoyer une demande de contact"}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center m-3">Aucun contact trouvé.</p>
          )}
        </Modal.Body>
      </Modal>

      {showConfirmationModal && (
        <ModalConfirmContact
          showModal={showConfirmationModal}
          onClose={() => {
            setShowConfirmationModal(false);
            setShowFirstModal(true);
          }}
        />
      )}
    </div>
  ) : null;
};

export default ModalAddsearchContact;
