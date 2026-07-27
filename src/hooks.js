import { useState, useEffect, useCallback } from "react";
import { SEED_PROJECTS, ADMIN_KEY } from "./data.js";

const PROJECTS_KEY = "portfolio_projects";
const ADMIN_SESSION_KEY = "portfolio_admin_session";

export function useProjects() {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(PROJECTS_KEY);
      if (raw) {
        setProjects(JSON.parse(raw));
      } else {
        setProjects(SEED_PROJECTS);
        localStorage.setItem(PROJECTS_KEY, JSON.stringify(SEED_PROJECTS));
      }
    } catch (e) {
      setProjects(SEED_PROJECTS);
    }
  }, []);

  const persist = useCallback((next) => {
    setProjects(next);
    try {
      localStorage.setItem(PROJECTS_KEY, JSON.stringify(next));
    } catch (e) {
      console.error("No se pudo guardar", e);
    }
  }, []);

  return { projects: projects || [], persist };
}

// Persists the admin session only in this browser (localStorage),
// so the login "sticks" for you on your own device and no one else sees it.
export function useAdmin() {
  const [isAdmin, setIsAdminState] = useState(() => {
    try {
      return localStorage.getItem(ADMIN_SESSION_KEY) === "1";
    } catch (e) {
      return false;
    }
  });

  const login = useCallback((password) => {
    if (password === ADMIN_KEY) {
      setIsAdminState(true);
      try {
        localStorage.setItem(ADMIN_SESSION_KEY, "1");
      } catch (e) {}
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsAdminState(false);
    try {
      localStorage.removeItem(ADMIN_SESSION_KEY);
    } catch (e) {}
  }, []);

  return { isAdmin, login, logout };
}
