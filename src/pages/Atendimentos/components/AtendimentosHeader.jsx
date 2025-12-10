import { Button, Space, Typography, Select, DatePicker } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Title } = Typography;

function AtendimentosHeader({ onAdd, pacientes = [], onFilterPaciente, onFilterData }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <Title level={3}>Atendimentos</Title>

      <Space wrap>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={onAdd}
        >
          Novo Atendimento
        </Button>

        {/* FILTRO POR PACIENTE */}
        <Select
          placeholder="Filtrar por paciente"
          allowClear
          style={{ width: 220 }}
          options={pacientes.map((p) => ({
            label: p.nome,
            value: p.key,
          }))}
          onChange={onFilterPaciente}
        />

        {/* FILTRO POR DATA */}
        <DatePicker
          placeholder="Filtrar por data"
          format="DD/MM/YYYY"
          onChange={(date) => {
            onFilterData(date ? date.format("YYYY-MM-DD") : null);
          }}
        />

      </Space>
    </div>
  );
}

export default AtendimentosHeader;
