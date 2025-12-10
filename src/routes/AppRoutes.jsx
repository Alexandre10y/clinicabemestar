import { Routes, Route, Navigate } from "react-router-dom";

// páginas
import Dashboard from "../pages/Dashboard/Dashboard";
import PacientesList from "../pages/Pacientes/PacientesList";
import AtendimentosList from "../pages/Atendimentos/AtendimentosList";
import AgendaPage from "../pages/Agenda/Agenda";
import FinanceiroPage from "../pages/Financeiro/FinanceiroPage";
import UsuariosList from "../pages/Usuarios/UsuariosList";
import Login from "../pages/Auth/Login";
import PerfilPage from "../pages/Perfil/PerfilPage";

import MainLayout from "../components/layout/MainLayout";
import PrivateRoute from "./PrivateRoute";

function AppRoutes() {
  return (
    <Routes>

      {/* LOGIN (público) */}
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<Navigate to="/dashboard" />} />

      {/* === ROTAS PROTEGIDAS COM LAYOUT === */}

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
              <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/pacientes"
        element={
          <PrivateRoute>
              <PacientesList />
          </PrivateRoute>
        }
      />

      <Route
        path="/atendimentos"
        element={
          <PrivateRoute>
              <AtendimentosList />
          </PrivateRoute>
        }
      />

      <Route
        path="/agendamentos"
        element={
          <PrivateRoute>
              <AgendaPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/financeiro"
        element={
          <PrivateRoute>
              <FinanceiroPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/usuarios"
        element={
          <PrivateRoute adminOnly>
              <UsuariosList />
          </PrivateRoute>
        }
      />

      <Route
        path="/perfil"
        element={
          <PrivateRoute>
              <PerfilPage />
          </PrivateRoute>
        }
      />

      {/* fallback */}
      <Route path="*" element={<Navigate to="/dashboard" />} />

    </Routes>
  );
}

export default AppRoutes;
