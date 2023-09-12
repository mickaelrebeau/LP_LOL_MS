import {  IonButton, IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";

export default function ProfilPage() {

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle> ProfilPage </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        <IonButton routerLink="/tabs/profil/groupList">
            Mes groupes
        </IonButton>

      </IonContent>
    </>
  );
}
