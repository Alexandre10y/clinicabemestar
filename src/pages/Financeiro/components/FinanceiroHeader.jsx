import { Space, DatePicker, Button, Select } from "antd";
import { exportToCSV } from "../../../utils/exportCSV";

const { RangePicker } = DatePicker;

function FinanceiroHeader({
  onFilterDate,
  onFilterPaciente,
  onFilterStatus,
  pacientes,
  dataParaExportar,
}) {
  return (
    <Space style={{ marginBottom: 20 }} wrap>
      <RangePicker
        format="DD/MM/YYYY"
        onChange={onFilterDate}
        style={{ width: 260 }}
      />

      <Select
        placeholder="Filtrar por paciente"
        allowClear
        style={{ width: 200 }}
        onChange={onFilterPaciente}
        options={pacientes}
      />

      <Select
        placeholder="Status"
        allowClear
        style={{ width: 150 }}
        onChange={onFilterStatus}
        options={[
          { label: "Pago", value: "pago" },
          { label: "Pendente", value: "pendente" },
        ]}
      />

      <Button onClick={() => exportToCSV(dataParaExportar)}>
        Exportar CSV
      </Button>
    </Space>
  );
}

export default FinanceiroHeader;
