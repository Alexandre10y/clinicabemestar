import { Table, Button, Space, Popconfirm, Tag } from "antd";

function AtendimentosTable({ data, pacientes, onEdit, onDelete }) {

  const getPacienteNome = (id) => {
    const p = pacientes.find((x) => x.key === id);
    return p ? p.nome : "—";
  };

  const columns = [
    {
      title: "Paciente",
      dataIndex: "paciente",
      key: "paciente",
      render: (id) => getPacienteNome(id)
    },
    { title: "Data", dataIndex: "data", key: "data" },
    { title: "Hora", dataIndex: "hora", key: "hora" },
    { title: "Profissional", dataIndex: "profissional", key: "profissional" },
    {
      title: "Pagamento",
      dataIndex: "pagamento",
      key: "pagamento",
      render: (tipo) => {
        const cores = {
          dinheiro: "volcano",
          pix: "green",
          cartao: "blue",
        };

        const labels = {
          dinheiro: "Dinheiro",
          pix: "Pix",
          cartao: "Cartão",
        };

        return <Tag color={cores[tipo]}>{labels[tipo]}</Tag>;
      },
    },

    // SERVIÇO (substitui Tipo)
    { title: "Serviço", dataIndex: "servico", key: "servico" },

    // STATUS
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) =>
        status === "pago" ? (
          <Tag color="green">Pago</Tag>
        ) : (
          <Tag color="red">Pendente</Tag>
        ),
    },
    //Tipo de pagamento

    // VALOR
    {
      title: "Valor (R$)",
      dataIndex: "valor",
      key: "valor",
      render: (valor) => `R$ ${Number(valor).toFixed(2)}`,
    },

    // AÇÕES
    {
      title: "Ações",
      key: "acoes",
      render: (_, record) => (
        <Space>
          <Button onClick={() => onEdit(record)}>Editar</Button>

          <Popconfirm
            title="Tem certeza que deseja excluir?"
            okText="Sim"
            cancelText="Não"
            onConfirm={() => onDelete(record.key)}
          >
            <Button danger>Excluir</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      style={{
        background: "#fff",
        padding: 20,
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
      }}
    />
  );
}

export default AtendimentosTable;
