import { useEffect, useState } from "react";
import { Card, Typography, Tag } from "antd";
import dayjs from "dayjs";
import { CalendarOutlined, ClockCircleOutlined, UserOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("userLogged"));
  const userId = user?.key;

  const atendimentosKey = `atendimentos-${userId}`;
  const pacientesKey = `pacientes-${userId}`;

  const [atendimentos, setAtendimentos] = useState([]);
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    const storedAt = JSON.parse(localStorage.getItem(atendimentosKey)) || [];
    const storedPac = JSON.parse(localStorage.getItem(pacientesKey)) || [];

    setAtendimentos(storedAt);
    setPacientes(storedPac);
  }, [userId]);

  const getNomePaciente = (id) =>
    pacientes.find((p) => p.key === id)?.nome || "—";

  // === Estatísticas ===
  const hoje = dayjs().startOf("day");

  const totalHoje = atendimentos.filter((a) =>
    dayjs(a.data).isSame(hoje, "day")
  ).length;

  const totalMes = atendimentos.filter((a) =>
    dayjs(a.data).isSame(hoje, "month")
  ).length;

  const valorTotal = atendimentos.reduce((acc, a) => acc + (a.valor || 0), 0);

  const valorPendente = atendimentos
    .filter((a) => a.status === "pendente")
    .reduce((acc, a) => acc + (a.valor || 0), 0);

  // === Cores por horário ===
  const getHoraCor = (hora) => {
    if (!hora) return "black";
    const [h] = hora.split(":").map(Number);

    if (h < 12) return "#1677FF"; // azul
    if (h < 17) return "#FA8C16"; // laranja
    return "#FF4D4F"; // vermelho
  };

  // === Próximos atendimentos (somente datas futuras) ===
  const proximos = atendimentos
    .filter((a) => dayjs(a.data).isAfter(hoje))
    .sort((a, b) => dayjs(a.data) - dayjs(b.data))
    .slice(0, 5);

  // === Últimos atendimentos (somente últimos 30 dias) ===
  const trintaDias = hoje.subtract(30, "day");

  const ultimos = atendimentos
    .filter((a) => dayjs(a.data).isBefore(hoje) && dayjs(a.data).isAfter(trintaDias))
    .sort((a, b) => dayjs(b.data) - dayjs(a.data))
    .slice(0, 5);

  const totalDinheiro = atendimentos
    .filter((a) => a.status === "pago" && a.pagamento === "dinheiro")
    .reduce((acc, a) => acc + (a.valor || 0), 0);

  const totalPix = atendimentos
    .filter((a) => a.status === "pago" && a.pagamento === "pix")
    .reduce((acc, a) => acc + (a.valor || 0), 0);

  const totalCartao = atendimentos
    .filter((a) => a.status === "pago" && a.pagamento === "cartao")
    .reduce((acc, a) => acc + (a.valor || 0), 0);

  return (
    <div>
      <Title level={3}>Clinica Bem Estar</Title>

      {/* === CARDS === */}
      <div
        style={{
          display: "flex",
          gap: 20,
          flexWrap: "wrap",
          marginBottom: 30,
          alignItems: "stretch",
        }}
      >
        <Card style={{ width: 220, height: 120 }}>
          <Title level={4} style={{ marginBottom: 0 }}>
            {totalHoje}
          </Title>
          <Text type="secondary">Atendimentos Hoje</Text>
        </Card>

        <Card style={{ width: 220, height: 120 }}>
          <Title level={4} style={{ marginBottom: 0 }}>
            {totalMes}
          </Title>
          <Text type="secondary">Atendimentos no Mês</Text>
        </Card>

        <Card style={{ width: 220, height: 120 }}>
          <Title level={4} style={{ marginBottom: 0 }}>
            R$ {valorTotal.toFixed(2)}
          </Title>
          <Text type="secondary">Valor Total</Text>
        </Card>

        <Card style={{ width: 220, height: 120 }}>
          <Title level={4} style={{ marginBottom: 0 }}>
            R$ {valorPendente.toFixed(2)}
          </Title>
          <Text type="secondary">Valor Pendente</Text>
        </Card>

        {/* === CARD DE PAGAMENTOS COMPACTO === */}
        <Card
          style={{
            width: 250,
            height: 120,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: 15,
            fontSize: 15,
          }}
        >
          <div>
            <Text><b>Dinheiro:</b> R$ {totalDinheiro.toFixed(2)}</Text>
          </div>
          <div>
            <Text><b>Cartão:</b> R$ {totalCartao.toFixed(2)}</Text>
          </div>
          <div>
            <Text><b>Pix:</b> R$ {totalPix.toFixed(2)}</Text>
          </div>
        </Card>
      </div>


      {/* === PRÓXIMOS === */}
      <Card title="Próximos atendimentos" style={{ marginBottom: 30 }}>
        {proximos.length === 0 ? (
          <Text>Nenhum próximo atendimento.</Text>
        ) : (
          proximos.map((item) => (
            <div key={item.key} style={{ marginBottom: 12 }}>
              <Text>
                <UserOutlined /> <b>{getNomePaciente(item.paciente)}</b> —{" "}
                <CalendarOutlined /> {item.data} —{" "}
                <ClockCircleOutlined style={{ color: getHoraCor(item.hora) }} />{" "}
                <span style={{ color: getHoraCor(item.hora), fontWeight: 600 }}>
                  {item.hora}
                </span>
              </Text>
            </div>
          ))
        )}
      </Card>

      {/* === ÚLTIMOS === */}
      <Card title="Últimos atendimentos (últimos 30 dias)">
        {ultimos.length === 0 ? (
          <Text>Nenhum atendimento recente.</Text>
        ) : (
          ultimos.map((item) => (
            <div key={item.key} style={{ marginBottom: 12 }}>
              <Text>
                <UserOutlined /> <b>{getNomePaciente(item.paciente)}</b> —{" "}
                <Tag color={item.status === "pago" ? "green" : "red"}>
                  {item.status === "pago" ? "Pago" : "Pendente"}
                </Tag>{" "}
                — R$ {item.valor?.toFixed(2)}
              </Text>
            </div>
          ))
        )}
      </Card>
    </div>
  );
}

export default Dashboard;
