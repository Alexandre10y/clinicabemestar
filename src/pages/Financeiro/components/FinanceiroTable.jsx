import { Table, Tag } from "antd";

function FinanceiroTable({ data }) {

  const columns = [
    { title: "Data", dataIndex: "data", key: "data" },
    { title: "Paciente", dataIndex: "pacienteNome", key: "pacienteNome" },
    { title: "Serviço", dataIndex: "servico", key: "servico" },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (s) =>
        s === "pago" ? (
          <Tag color="green">Pago</Tag>
        ) : (
          <Tag color="red">Pendente</Tag>
        ),
    },

    {
      title: "Valor (R$)",
      dataIndex: "valor",
      key: "valor",
      render: (v) => `R$ ${Number(v).toFixed(2)}`,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data.map((a) => ({ ...a, key: a.key }))}
      pagination={{ pageSize: 6 }}
    />
  );
}

export default FinanceiroTable;
