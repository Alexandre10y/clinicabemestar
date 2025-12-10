import { Button, Dropdown, Space, Typography, Input } from "antd";
import { DownOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";

const { Title } = Typography;

function PacientesHeader({ onAdd, onSearch }) {
  const items = [
    { key: "1", label: "Exportar" },
    { key: "2", label: "Importar" },
    { key: "3", label: "Gerar relatório" },
  ];

  return (
    <div style={{ marginBottom: 20 }}>
      <Title level={3}>Clientes</Title>

      <Space>

        <Dropdown menu={{ items }}>
          <Button>
            <Space>
              Ações
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>

        <Button type="primary" icon={<PlusOutlined />} onClick={onAdd}>
          Adicionar
        </Button>

        <Input
          placeholder="Buscar cliente..."
          prefix={<SearchOutlined />}
          onChange={(e) => onSearch(e.target.value)}
          style={{ width: 250 }}
        />
      </Space>
    </div>
  );
}

export default PacientesHeader;
