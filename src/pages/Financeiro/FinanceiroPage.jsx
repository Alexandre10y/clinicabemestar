import { useEffect, useState } from "react";
import { Typography } from "antd";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

import FinanceiroHeader from "./components/FinanceiroHeader";
import FinanceiroResumo from "./components/FinanceiroResumo";
import FinanceiroTable from "./components/FinanceiroTable";
import FinanceiroPrint from "./components/FinanceiroPrint";

const { Title } = Typography;

function FinanceiroPage() {
  const [atendimentos, setAtendimentos] = useState([]);
  const [filtrados, setFiltrados] = useState([]);

  const user = JSON.parse(localStorage.getItem("userLogged"));
  const userId = user?.key;

  const atendimentosKey = `atendimentos-${userId}`;
  const pacientesKey = `pacientes-${userId}`;

  // === CARREGAR DADOS ===
  useEffect(() => {
    if (!userId) return;

    const storedAt = JSON.parse(localStorage.getItem(atendimentosKey)) || [];
    const storedPac = JSON.parse(localStorage.getItem(pacientesKey)) || [];

    const merged = storedAt.map(a => ({
      ...a,
      pacienteNome: storedPac.find(p => p.key === a.paciente)?.nome || "—",
    }));

    // sempre define tudo junto
    setAtendimentos(merged);
    setFiltrados(merged);

  }, [userId, atendimentosKey, pacientesKey]);
  // <- Correto


  // === FILTRO POR DATA ===
  const handleFilterDate = (dates) => {
    if (!dates || !dates[0] || !dates[1]) {
      setFiltrados(atendimentos);
      return;
    }

    const [inicio, fim] = dates;

    const result = atendimentos.filter((a) =>
      dayjs(a.data).isBetween(
        inicio.startOf("day"),
        fim.endOf("day"),
        null,
        "[]"
      )
    );

    setFiltrados(result);
  };


  // === FILTRO POR PACIENTE ===
  const handleFilterPaciente = (nome) => {
    if (!nome) return setFiltrados(atendimentos);

    setFiltrados(atendimentos.filter((a) => a.pacienteNome === nome));
  };

  // === FILTRO POR STATUS ===
  const handleFilterStatus = (status) => {
    if (!status) return setFiltrados(atendimentos);

    setFiltrados(atendimentos.filter((a) => a.status === status));
  };


  // === RESUMOS ===
  const totalPeriodo = filtrados.reduce((s, a) => s + Number(a.valor || 0), 0);
  const totalPago = filtrados
    .filter((a) => a.status === "pago")
    .reduce((s, a) => s + Number(a.valor || 0), 0);
  const totalPendente = filtrados
    .filter((a) => a.status === "pendente")
    .reduce((s, a) => s + Number(a.valor || 0), 0);


  // === LISTA DE PACIENTES PARA O SELECT ===
  const listaPacientes = Array.from(new Set(atendimentos.map(a => a.pacienteNome)))
    .filter(n => n !== "—")
    .map(nome => ({
      label: nome,
      value: nome
    }));


  return (
    <div>
      <Title level={3}>Financeiro</Title>

      <FinanceiroHeader
        onFilterDate={handleFilterDate}
        onFilterPaciente={handleFilterPaciente}
        onFilterStatus={handleFilterStatus}
        pacientes={listaPacientes}
        dataParaExportar={filtrados}
      />

      <FinanceiroResumo
        totalPeriodo={totalPeriodo}
        totalPago={totalPago}
        totalPendente={totalPendente}
      />

      {/* Área visível */}
      <FinanceiroTable data={filtrados} />

      {/* Área para impressão */}
      <FinanceiroPrint>
        <FinanceiroTable data={filtrados} />
      </FinanceiroPrint>
    </div>
  );
}

export default FinanceiroPage;
