import { useEffect, useState } from "react";
import { Card, Typography, DatePicker, Button } from "antd";
import {
  UserOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

import AtendimentoModal from "../Atendimentos/components/AtendimentoModal";

const { Title, Text } = Typography;

function AgendaPage() {
  const [atendimentos, setAtendimentos] = useState([]);
  const [pacientes, setPacientes] = useState([]);

  const [dataSelecionada, setDataSelecionada] = useState(dayjs());

  const [modalOpen, setModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);

  const user = JSON.parse(localStorage.getItem("userLogged"));
  const userId = user?.key;

  const atendimentosKey = `atendimentos-${userId}`;
  const pacientesKey = `pacientes-${userId}`;

  // === CARREGAR DADOS ===
  useEffect(() => {
    const storedAt = JSON.parse(localStorage.getItem(atendimentosKey)) || [];
    const storedPac = JSON.parse(localStorage.getItem(pacientesKey)) || [];

    setAtendimentos(storedAt);
    setPacientes(storedPac);
  }, [userId]);

  const getNomePaciente = (id) =>
    pacientes.find((p) => p.key === id)?.nome || "—";

  const getHoraCor = (hora) => {
    const h = Number(hora.split(":")[0]);
    if (h < 12) return "#1677FF"; // manhã
    if (h < 17) return "#FA8C16"; // tarde
    return "#FF4D4F"; // noite
  };

  // === FILTRAR POR DIA ===
  const filtrados = atendimentos
    .filter((a) => dayjs(a.data).isSame(dataSelecionada, "day"))
    .sort((a, b) => a.hora.localeCompare(b.hora));

  const mudarDia = (dias) => {
    setDataSelecionada((old) => old.add(dias, "day"));
  };

  // === SALVAR ATENDIMENTO EDITADO ===
  const handleSubmit = (registroAtualizado) => {
    const novaLista = atendimentos.map((a) =>
      a.key === editingData.key ? { ...editingData, ...registroAtualizado } : a
    );

    setAtendimentos(novaLista);
    localStorage.setItem(atendimentosKey, JSON.stringify(novaLista));

    setModalOpen(false);
    setEditingData(null);
  };

  return (
    <div>
      <Title level={3}>Agenda do Dia</Title>

      {/* CONTROLES */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <Button onClick={() => mudarDia(-1)}>← Dia Anterior</Button>
        <Button onClick={() => setDataSelecionada(dayjs())}>Hoje</Button>
        <Button onClick={() => mudarDia(1)}>Próximo Dia →</Button>

        <DatePicker
          value={dataSelecionada}
          onChange={(d) => setDataSelecionada(d)}
          format="DD/MM/YYYY"
        />
      </div>

      {/* LISTAGEM DO DIA */}
      <Card title={`Atendimentos em ${dataSelecionada.format("DD/MM/YYYY")}`}>
        {filtrados.length === 0 ? (
          <Text>Nenhum atendimento neste dia.</Text>
        ) : (
          filtrados.map((item) => (
            <Card
              key={item.key}
              hoverable
              onClick={() => {
                setEditingData(item);
                setModalOpen(true);
              }}
              style={{
                marginBottom: 12,
                cursor: "pointer",
                borderLeft: `4px solid ${getHoraCor(item.hora)}`,
              }}
            >
              <Text style={{ fontSize: 16 }}>
                <UserOutlined /> <b>{getNomePaciente(item.paciente)}</b> <br />
                <ClockCircleOutlined style={{ color: getHoraCor(item.hora) }} />{" "}
                {item.hora}
                <br />
                <CalendarOutlined /> {item.servico}
                <br />
                <Text type={item.status === "pago" ? "success" : "danger"}>
                  {item.status === "pago" ? "Pago" : "Pendente"}
                </Text>
              </Text>
            </Card>
          ))
        )}
      </Card>

      {/* === MODAL DE EDIÇÃO === */}
      <AtendimentoModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingData(null);
        }}
        pacientes={pacientes}
        editingData={editingData}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default AgendaPage;
