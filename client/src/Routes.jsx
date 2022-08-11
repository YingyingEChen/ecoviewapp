import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import SettingsPage from "./settings";
// import ProjectsPage from "./projects";
// import MembersPage from "./members";
// import AboutPage from "./about";
// import TeamsPage from "./teams";
import HomePage from "./Home";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/about/members" element={<HomePage />} />
                {/* <MembersPage /> */}
                <Route path="/about/projects" element={<HomePage />} />
                {/* <ProjectsPage /> */}
                <Route path="/about" element={<HomePage />} />
                {/* <AboutPage /> */}
                <Route path="/another/teams" element={<HomePage />} />
                {/* <TeamsPage /> */}
                <Route path="/settings" element={<HomePage />} />
                {/* <SettingsPage /> */}
                <Route path="/home" element={<HomePage />} />
                <Route path="/" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
