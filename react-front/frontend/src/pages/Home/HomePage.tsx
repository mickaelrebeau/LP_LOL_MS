import "./HomePage.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Data from "../../services/dataService";
import MyPagination from "../../components/Pagination/Pagination";
import { DataContacts } from "../../utils/Interfaces/DataContact.interface";
import ModalAddsearchContact from "../../components/Modals/ModalAddsearchContact";
//import Loader from "../../utils/Loader/Loader";

const HomePage = () => {
  //data a changer quant il y aura le back de dispo!
  const data = new Data();
  const contactsData = data.getDataContacts();

  const [searchQuery, setSearchQuery] = useState("");

  const [filteredContacts, setFilteredContacts] = useState(contactsData);

  const [showModal, setShowModal] = useState(false);

  const [animatedCards, setAnimatedCards] = useState<number[]>([]);

  const [showNotificationSinjed, setShowNotificationSinjed] =
    useState(true);

  const [showNotificationUrgot, setShowNotificationUrgot] = useState(true);

  const closeNotificationSinjed = () => {
    setShowNotificationSinjed(false);
  };

  const closeNotificationUrgot = () => {
    setShowNotificationUrgot(false);
  };

  //logique search bar
  const filterContacts = (contacts: DataContacts[], query: string) => {
    return contacts.filter(
      (contact) =>
        contact.pseudo.toLowerCase().includes(query.toLowerCase()) ||
        contact.email.toLowerCase().includes(query.toLowerCase())
    );
  };

  //logique supprimer un contact a peaufiner avec le back !
  const handleDeleteContact = (id: number) => {
    const updatedContacts = filteredContacts.filter(
      (contact) => contact.id !== id
    );
    setAnimatedCards([...animatedCards, id]);

    setTimeout(() => {
      setFilteredContacts(updatedContacts);

      setTimeout(() => {
        setAnimatedCards(animatedCards.filter((cardId) => cardId !== id));
      }, 1200);
    }, 800);
  };

  //logique pagination
  const itemsPerPage = 5; // ici le nombre de contact afficher par page
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const contactsToShow = filteredContacts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const navigate = useNavigate();

  //logique modal
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  //logique filtrage
  useEffect(() => {
    const filtered = filterContacts(filteredContacts, searchQuery);
    setFilteredContacts(filtered);
    setCurrentPage(1); // Réinitialisez la page courante après chaque recherche
  }, [contactsData, searchQuery]);

  return (
    <main className="home_container">
      {/* <Loader /> //Loader a choisir ensemble */}

      {/* Notification  */}

      <section className="notification">
        <div className="notification_container">
          {showNotificationSinjed && (
            <div className="notification_box">
              <p className="notification_text">
              Sinjed vous a envoyé une demande de contact
              </p>
              <div className="notification_button">
                <button
                  className="notification_button--show"
                  onClick={() => {
                    navigate(`/request`);
                  }}
                >
                  ➔
                </button>
                <button
                  className="notification_button--close"
                  onClick={closeNotificationSinjed}
                >
                  X
                </button>
              </div>
            </div>
          )}

          {showNotificationUrgot && (
            <div className="notification_box">
              <p className="notification_text">
                Urgot souhaite obtenir des informations complémentaires
              </p>
              <div className="notification_button">
                <button
                  className="notification_button--show"
                  onClick={() => {
                    navigate(`/request`);
                  }}
                >
                  ➔
                </button>
                <button
                  className="notification_button--close"
                  onClick={closeNotificationUrgot}
                >
                  X
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Barre de recherche  */}

      <section className="searchBar">
        <input
          type="text"
          name="searchBar"
          id="searchBar"
          placeholder="Pseudo email"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <label className="searchBar_label">
          Rechercher un pseudo ou un email
        </label>
        <div className="loupe">
          <div className="loupe_container">
            <div className="loupe_round"></div>
            <div className="loupe_bar"></div>
          </div>
        </div>
      </section>

      {/* Rechercher un contact  */}
      <div className="d-flex justify-content-center">
        <div className="contact_addsearch">
          <h2 className="title_addsearch">Ajouter des contacts</h2>
          <button className="button_addsearch" onClick={handleOpenModal}>
            +
          </button>
          <ModalAddsearchContact
            showModal={showModal}
            onClose={handleCloseModal}
          />
        </div>
      </div>

      {/* Contacts  */}

      <section className="contactCard">
        <h2>Contacts</h2>
        <div className="contactCard_container">
          {contactsToShow.length === 0 ? (
            <p>Votre liste de contacts est vide pour le moment...</p>
          ) : (
            contactsToShow.map((contacts: DataContacts) => (
              <div
                className={`contactCard_card ${
                  animatedCards.includes(contacts.id) ? "fade_out" : ""
                }`}
                key={contacts.id}
              >
                <div className="card_one">
                  <h3 className="one_title">{contacts.pseudo}</h3>
                  <p className="one_email">{contacts.email}</p>
                </div>
                <div className="card_two">
                  <button
                    className="two_button_see"
                    onClick={() => {
                      navigate(`/contacts/${contacts.id}`);
                    }}
                  >
                    Voir
                  </button>
                  <button
                    className="two_button_delete"
                    onClick={() => {
                      handleDeleteContact(contacts.id);
                    }}
                  >
                    Supp
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination  */}

        <div className="contactCard_pagination">
          <MyPagination
            total={Math.ceil(contactsData.length / itemsPerPage)}
            currentPage={currentPage}
            onChangePage={handlePageChange}
          />
        </div>
      </section>
    </main>
  );
};

export default HomePage;
