import { Button, Space, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Title } = Typography;

function UsuariosHeader({ onAdd }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <Title level={3}>Usuários do Sistema</Title>

      <Space>
        <Button type="primary" icon={<PlusOutlined />} onClick={onAdd}>
          Novo Usuário
        </Button>
      </Space>
    </div>
  );
}

export default UsuariosHeader;
