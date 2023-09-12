import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

export default function GroupListPage() {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/profil"></IonBackButton>
          </IonButtons>
          <IonTitle> GroupePage </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding"></IonContent>
    </>
  );
}
