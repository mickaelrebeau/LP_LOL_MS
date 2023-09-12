import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { useState } from "react";
import { useHistory } from 'react-router-dom';

import "./Sign.css";

export default function SignPage() {
  const history = useHistory();

  const [selectedSegment, setSelectedSegment] = useState("all");

  const handleSegmentChange = (event: CustomEvent) => {
    setSelectedSegment(event.detail.value);
  };

  const handleSubmit = (evt:any) => {
    evt.preventDefault();
    history.push('/tabs');


  };

  const handleChange = (event: any) => {};

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonSegment value={selectedSegment} onIonChange={handleSegmentChange}>
            <IonSegmentButton value="all">
              <IonLabel>Connexion</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="favorites">
              <IonLabel>Inscription</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {selectedSegment === "all" && (
          <div className="center-form">
            <form onSubmit={handleSubmit}>

              <IonItem>
                <IonInput
                  onChange={(e) => handleChange(e)}
                  label="Email"
                  labelPlacement="floating"
                />
              </IonItem>

              <IonItem>
                <IonInput
                  onChange={(e) => handleChange(e)}
                  id="custom-input"
                  label="Mot de passe"
                  labelPlacement="floating"
                />
              </IonItem>

              <IonButton className="custom-button"  type="submit">Se connecter</IonButton>

            </form>
          </div>
        )}
        {selectedSegment === "favorites" && <div>Inscription</div>}
      </IonContent>
    </>
  );
}
