import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import React from "react";
import { Redirect, Route } from "react-router";

import { ellipse, square, triangle } from "ionicons/icons";

import RequestListPage from "../../pages/Tabs/Request/RequestListPage";

import HomePage from "../../pages/Tabs/Home/HomePage";
import ProfilPage from "../../pages/Tabs/Profil/ProfilPage";
import GroupListPage from "../../pages/Group/GroupListPage";

const Tabs: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        
        <Route exact path="/tabs/requestList" component={RequestListPage} />

        <Route exact path="/tabs/home" component={HomePage} />
        
        <Route exact path="/tabs/profil" component={ProfilPage} />
        <Route exact path="/tabs/profil/groupList" component={GroupListPage} />


  
        <Route exact path="/tabs">
          <Redirect to="/tabs/home"></Redirect>
        </Route>

      </IonRouterOutlet>

      <IonTabBar slot="bottom">

        <IonTabButton tab="request" href="/tabs/requestList">
          <IonIcon aria-hidden="true" icon={triangle} />
          <IonLabel>Mes Demandes</IonLabel>
        </IonTabButton>

        <IonTabButton tab="home" href="/tabs/home">
          <IonIcon aria-hidden="true" icon={ellipse} />
          <IonLabel>Accueil</IonLabel>
        </IonTabButton>

        <IonTabButton tab="profil" href="/tabs/profil">
          <IonIcon aria-hidden="true" icon={square} />
          <IonLabel>Profil</IonLabel>
        </IonTabButton>

      </IonTabBar>

    </IonTabs>
  );
};

export default Tabs;
