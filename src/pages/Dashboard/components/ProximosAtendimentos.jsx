import { List } from "antd";

function ProximosAtendimentos({ data, pacientes }) {
  return (
    <List
      header="Próximos Atendimentos"
      bordered
      dataSource={data}
      renderItem={(item) => {
        const paciente = pacientes.find(p => p.key === item.paciente)?.nome || "—";

        return (
          <List.Item>
            {paciente} — {item.data} às {item.hora} — {item.servico}
          </List.Item>
        );
      }}
    />
  );
}

export default ProximosAtendimentos;
