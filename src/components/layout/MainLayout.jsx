import { Layout, Menu, Avatar } from "antd";
import {
  DashboardOutlined,
  TeamOutlined,
  ScheduleOutlined,
  FileTextOutlined,
  DollarOutlined,
  UserOutlined,
  LogoutOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

function MainLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("userLogged");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const handleLogout = () => {
    localStorage.removeItem("userLogged");
    navigate("/login");
  };

  const items = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: <Link to="/dashboard">Dashboard</Link>,
    },
    {
      key: "/pacientes",
      icon: <TeamOutlined />,
      label: <Link to="/pacientes">Pacientes</Link>,
    },
    {
      key: "/atendimentos",
      icon: <FileTextOutlined />,
      label: <Link to="/atendimentos">Atendimentos</Link>,
    },
    {
      key: "/agendamentos",
      icon: <ScheduleOutlined />,
      label: <Link to="/agendamentos">Agenda</Link>,
    },
    {
      key: "/financeiro",
      icon: <DollarOutlined />,
      label: <Link to="/financeiro">Financeiro</Link>,
    },
    // Perfil visível para qualquer usuário logado
    {
      key: "/perfil",
      icon: <IdcardOutlined />,
      label: <Link to="/perfil">Perfil</Link>,
    },
    // Usuários só para admin
    user?.tipo === "admin" && {
      key: "/usuarios",
      icon: <UserOutlined />,
      label: <Link to="/usuarios">Usuários</Link>,
    },
    {
      key: "/logout",
      icon: <LogoutOutlined />,
      label: "Sair",
      onClick: handleLogout,
    },
  ].filter(Boolean);

  const nomeUsuario = user?.nome || "Usuário";

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        {/* TOPO DO MENU LATERAL: FOTO + NOME DO USUÁRIO */}
        <div
          style={{
            textAlign: "center",
            padding: "20px 0",
            color: "#fff"
          }}
        >
          <img
            src={user?.foto || "https://i.imgur.com/b5l5fFh.png"}
            alt="foto"
            style={{
              width: 70,
              height: 70,
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #fff",
              marginBottom: 10
            }}
          />
          <div style={{ fontWeight: "bold", fontSize: 16 }}>
            {user?.nome}
          </div>
        </div>


        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={items}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <span style={{ fontSize: 18, fontWeight: 500 }}>
            Sistema da Clínica
          </span>

          {/* NOME DO USUÁRIO NO TOPO */}
          <span style={{ fontSize: 14 }}>
            {nomeUsuario}
          </span>
        </Header>

        <Content
          style={{
            margin: "24px",
            padding: 24,
            background: "#fff",
            borderRadius: 12,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
