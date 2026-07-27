import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components.jsx";
import { useProjects } from "./hooks.js";
import Home from "./pages/Home.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";

export default function App() {
  const { projects, persist } = useProjects();

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home projects={projects} />} />
        <Route path="/proyectos" element={<ProjectsPage projects={projects} persist={persist} />} />
        <Route path="/proyectos/:id" element={<ProjectDetail projects={projects} persist={persist} />} />
      </Routes>
    </Layout>
  );
}
