import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { settings } from "ionicons/icons";

import profil from "../../../assets/profil.png";

import "./Home.css";
import MainMenu from "../../../components/MainMenu/MainMenu";

export default function HomePage() {
  const userName = "John Doe"; // Remplacer par le nom de la personne
  const userImage = "../assets/profil.png";

  return (
   
    <>
        <MainMenu /> 
    
        <IonHeader id="main-content">
          
          <IonToolbar>
            <div className="part1">
              <IonAvatar>
                <img src={profil} alt="Profil" className="profile-image" />
              </IonAvatar>

              {userName}
            </div>

            <IonButtons slot="end">
              <IonMenuButton autoHide={false} />
            </IonButtons>
          </IonToolbar>
        </IonHeader>

   
        <IonContent className="ion-padding"></IonContent>
   
    </>
  );
}
