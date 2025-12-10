import { List } from "antd";

function PagamentosPendentes({ data, pacientes }) {
  return (
    <List
      header="Pagamentos Pendentes"
      bordered
      dataSource={data}
      renderItem={(item) => {
        const paciente = pacientes.find(p => p.key === item.paciente)?.nome || "—";

        return (
          <List.Item>
            {paciente} — {item.servico} — R$ {item.valor}
          </List.Item>
        );
      }}
    />
  );
}

export default PagamentosPendentes;
