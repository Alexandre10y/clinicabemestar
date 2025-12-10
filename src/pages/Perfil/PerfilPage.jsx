import { useEffect, useState } from "react";
import { Card, Form, Input, Button, Upload, message, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import atualizarUsuarioGlobal from "../../utils/userUpdate";

function PerfilPage() {
  const [form] = Form.useForm();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userLogged"))
  );

  // Pré-carregar dados no formulário
  useEffect(() => {
    form.setFieldsValue(user);
  }, []);

  // Upload da imagem base64
  const handleUpload = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;

      const novoUser = { ...user, foto: base64 };
      form.setFieldsValue({ foto: base64 });

      setUser(novoUser);
      atualizarUsuarioGlobal(novoUser);

      message.success("Foto atualizada!");
    };
    reader.readAsDataURL(file);

    return false;
  };

  const handleSubmit = (values) => {
    const atualizado = {
      ...user,
      ...values,
    };

    setUser(atualizado);
    atualizarUsuarioGlobal(atualizado);

    message.success("Perfil atualizado com sucesso!");
  };

  return (
    <Card title="Meu Perfil" style={{ maxWidth: 500, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <img
          src={user.foto || "https://i.imgur.com/b5l5fFh.png"}
          alt="foto"
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            objectFit: "cover",
            border: "3px solid #1677ff"
          }}
        />
      </div>

      <Upload beforeUpload={handleUpload} showUploadList={false}>
        <Button icon={<UploadOutlined />} block style={{ marginBottom: 20 }}>
          Alterar Foto
        </Button>
      </Upload>

      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item label="Nome" name="nome" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="E-mail" name="email" rules={[{ required: true }]}>
          <Input type="email" />
        </Form.Item>

        <Form.Item label="Telefone" name="telefone">
          <Input />
        </Form.Item>

        <Form.Item
          label="Tipo de Usuário"
          name="tipo"
          rules={[{ required: true }]}
        >
          <Select
            options={[
              { label: "Administrador", value: "admin" },
              { label: "Profissional", value: "profissional" },
            ]}
          />
        </Form.Item>

        <Form.Item label="Senha" name="senha" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Salvar Alterações
        </Button>
      </Form>
    </Card>
  );
}

export default PerfilPage;
