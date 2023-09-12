/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/custom.scss';
import { Route, Routes } from "react-router-dom";
import './App.css'

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/Home/HomePage";
import Page404 from "./utils/Page404/Page404";
import AuthPage from "./pages/Auth/AuthPage";
import RequestPage from "./pages/RequestPage/RequestPage";
import ProfilPage from "./pages/ProfilPage/ProfilPage";
import ScanPage from "./pages/ScanPage/ScanPage";
import SecurityPage from "./pages/SecurityPage/SecurityPage";
import PrivateRoutes from "./utils/Privateroute";
import DetailsContactPage from "./pages/DetailsContactPage/DetailsContactPage";
import GroupCreatePage from './pages/GroupPages/GroupCreatePage';
import GroupListPage from './pages/GroupPages/GroupListPage';
import GroupDetailPage from './pages/GroupPages/GroupDetailPage';
import GroupEditPage from './pages/GroupPages/GroupEditPage';
import HistoriquePage from "./pages/Historique/HistoriquePage";
import './assets/style/custom-bootstrap.scss'
import './components/Modals/Modals.scss'
import DataCreatePage from './pages/DataPages/DataCreatePage';
import DataListPage from './pages/DataPages/DataListPage';
import DataDetailPage from './pages/DataPages/DataDetailPage';
import { useLocalStorage } from './hooks/useLocalStorage';


const App = () => {
  const STORAGE_KEY = "token";
  const STORAGE_KEY2 = "refresh_token";
  const STORAGE_KEY3 = "user_id";
  // @ts-ignore
  const [token, setToken]: any = useLocalStorage(STORAGE_KEY, "");
  // @ts-ignore
  const [refreshToken, setRefreshToken]: any = useLocalStorage(STORAGE_KEY2, "");

  const [user_id, setUser_id] = useLocalStorage<string>(STORAGE_KEY3, "");

  function handleAddTokens(token: string, refreshToken: string, user_id: string) {
    setToken(token);
    setRefreshToken(refreshToken);
    setUser_id(user_id);
  }

  return (
    <>
    <div className="contain">

      <Header />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/contacts/:id" element={<DetailsContactPage />} />
          <Route path="/profil" element={<ProfilPage user_id={user_id}/>} />
          <Route path="/security" element={<SecurityPage user_id={user_id} />} />
          <Route path="/scan" element={<ScanPage />} />
          <Route path="/request" element={<RequestPage />} />
          <Route path="/group" element= { <GroupCreatePage />} />
          <Route path="/group/all" element= { <GroupListPage />} />
          <Route path="/group/:id" element= { <GroupDetailPage />} />
          <Route path="/group/update/:id" element= { <GroupEditPage />} />
          <Route path="/historique" element= { <HistoriquePage />}></Route>
          <Route path="/data" element= { <DataCreatePage />} />
          <Route path="/data/all/:id" element= { <DataListPage/>} />
          <Route path="/data/:id" element= { <DataDetailPage />} />
          <Route path="/auth" element= { <AuthPage handleAddTokens={handleAddTokens}/>} />
          <Route path="/" element= { <AuthPage handleAddTokens={handleAddTokens}/>} />
        </Route>

        <Route path="*" element={<Page404 />} />
      </Routes>
      <Footer />

    </div>
    </>
  );
};

export default App;
