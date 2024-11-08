import * as React from "react";
import { Paper } from "@mui/material";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import AuthService from "./services/auth.service";

import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import Administration from "./pages/Public/Administration";
import PCK from "./pages/Public/PCK";
import UMR from "./pages/Public/umr";
import News from "./pages/Public/News";
import Photogallery from "./pages/Public/Photogallery";
import Courses from "./pages/Public/Courses";
import Contacts from "./pages/Public/Contacts";
import Abiturient from "./pages/Public/Abiturient";
import AdditionalInfo from "./pages/Public/AdditionalInfo";
import AdminLayout from "./pages/Admin/AdminLayout";
import ProfileTeacher from "./pages/Teacher/ProfileTeacher";
import ProfileStudent from "./pages/Student/ProfileStudent";
import Header from "./components/pageload/Header";
import Footer from "./components/pageload/Footer";

const user = AuthService.getCurrentUser();

const RoleAccess = ({ roles = [] }) => {
  return !roles.length || roles.includes(user?.role) ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};

export default function App() {
  return (
    <Paper>
      {/* Header here provides the LanguageContext globally */}
      <Header />
      
      {/* Main content */}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/administation" element={<Administration />} />
        <Route path="/pck" element={<PCK />} />
        <Route path="/umr" element={<UMR />} />
        <Route path="/news" element={<News />} />
        <Route path="/photogallery" element={<Photogallery />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/abiturient" element={<Abiturient />} />
        <Route path="/additionalinfo" element={<AdditionalInfo />} />

        {/* Protected routes */}
        <Route element={<RoleAccess roles={[1]} />}>
          <Route path="/admin" element={<AdminLayout />} />
        </Route>
        <Route element={<RoleAccess roles={[2]} />}>
          <Route path="/teacher" element={<ProfileTeacher />} />
        </Route>
        <Route element={<RoleAccess roles={[3]} />}>
          <Route path="/student" element={<ProfileStudent />} />
        </Route>
      </Routes>

      <Footer />
    </Paper>
  );
}
