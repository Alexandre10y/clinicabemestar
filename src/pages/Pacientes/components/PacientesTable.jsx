import { Table, Button, Space, Popconfirm } from "antd";

function PacientesTable({ data, onEdit, onDelete }) {
  const columns = [
    { title: "Nome", dataIndex: "nome", key: "nome" },
    { title: "E-mail", dataIndex: "email", key: "email" },
    { title: "Telefone", dataIndex: "telefone", key: "telefone" },
    { title: "CPF", dataIndex: "cpf", key: "cpf" },

    {
      title: "Ações",
      key: "acoes",
      render: (_, record) => (
        <Space>
          <Button type="default" onClick={() => onEdit(record)}>
            Editar
          </Button>

          <Popconfirm
            title="Tem certeza que deseja excluir?"
            okText="Sim"
            cancelText="Cancelar"
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
      rowKey="key"
      pagination={false}
      style={{
        background: "#fff",
        padding: 20,
        borderRadius: 8,
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      }}
    />
  );
}

export default PacientesTable;
