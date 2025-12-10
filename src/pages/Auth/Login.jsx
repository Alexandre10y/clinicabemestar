import { useState } from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = ({ email, senha }) => {
    setLoading(true);

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const user = usuarios.find(
      (u) => u.email === email && u.senha === senha
    );

    if (!user) {
      message.error("E-mail ou senha incorretos.");
      setLoading(false);
      return;
    }

    localStorage.setItem("userLogged", JSON.stringify(user));

    message.success("Login realizado com sucesso!");
    setLoading(false);
    navigate("/"); // dashboard (ou página principal)
  };

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#f0f2f5"
    }}>
      <Card style={{ width: 400, padding: 20 }}>

        <Title level={3} style={{ textAlign: "center" }}>
          Acesso ao Sistema
        </Title>

        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item
            label="E-mail"
            name="email"
            rules={[{ required: true, message: "Digite seu e-mail" }]}
          >
            <Input type="email" />
          </Form.Item>

          <Form.Item
            label="Senha"
            name="senha"
            rules={[{ required: true, message: "Digite sua senha" }]}
          >
            <Input.Password />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
          >
            Entrar
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
