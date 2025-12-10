import { Table, Button, Space, Popconfirm } from "antd";

function UsuariosTable({ data, onEdit, onDelete }) {
  const columns = [
    { title: "Nome", dataIndex: "nome", key: "nome" },
    { title: "E-mail", dataIndex: "email", key: "email" },
    { title: "Tipo", dataIndex: "tipo", key: "tipo" }, // admin / profissional
    { title: "Telefone", dataIndex: "telefone", key: "telefone" },

    {
      title: "Ações",
      key: "acoes",
      render: (_, record) => (
        <Space>
          <Button onClick={() => onEdit(record)}>Editar</Button>

          <Popconfirm
            title="Excluir usuário?"
            okText="Sim"
            cancelText="Não"
            onConfirm={() => onDelete(record.key)}
          >
            <Button danger>Excluir</Button>
          </Popconfirm>
        </Space>
      )
    }
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

export default UsuariosTable;
