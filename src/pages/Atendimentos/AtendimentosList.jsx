import { useEffect, useState } from "react";
import { message } from "antd";
import AtendimentosHeader from "./components/AtendimentosHeader";
import AtendimentosTable from "./components/AtendimentosTable";
import AtendimentoModal from "./components/AtendimentoModal";
import { isHorarioDuplicado } from "./utils/AtendimentoValidator";

function AtendimentosList() {
  const [openModal, setOpenModal] = useState(false);
  const [atendimentos, setAtendimentos] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [editingData, setEditingData] = useState(null);

  const [filtroPaciente, setFiltroPaciente] = useState(null);
  const [filtroData, setFiltroData] = useState(null);

  // === USUÁRIO LOGADO ===
  const user = JSON.parse(localStorage.getItem("userLogged"));
  const userId = user?.key;

  // === KEYS POR USUÁRIO ===
  const pacientesKey = `pacientes-${userId}`;
  const atendimentosKey = `atendimentos-${userId}`;

  // === CARREGAR PACIENTES E ATENDIMENTOS ===
  useEffect(() => {
    if (!userId) return;

    const storedPacientes = JSON.parse(localStorage.getItem(pacientesKey)) || [];
    const storedAtendimentos = JSON.parse(localStorage.getItem(atendimentosKey)) || [];

    setPacientes(storedPacientes);
    setAtendimentos(storedAtendimentos);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // === SALVAR ATENDIMENTOS ===
  const salvarLocal = (lista) => {
    localStorage.setItem(atendimentosKey, JSON.stringify(lista));
  };

  // === CRIAR OU EDITAR ATENDIMENTO ===
  const handleSubmit = (registro) => {
    // pegar nome do paciente automaticamente
    const paciente = pacientes.find((p) => p.key === registro.paciente);

    const atendimentoFinal = editingData
      ? {
          ...editingData,
          ...registro,
          pacienteNome: paciente?.nome || "—",
        }
      : {
          ...registro,
          pacienteNome: paciente?.nome || "—",
          key: Date.now(),
          userId,
        };

    // 🔥 Validação de horário duplicado
    const ehDuplicado = isHorarioDuplicado(
      atendimentoFinal,
      atendimentos,
      editingData?.key || null
    );

    if (ehDuplicado) {
      message.error("Já existe um atendimento neste dia e horário!");
      return;
    }

    // salvar lista
    let novaLista;

    if (editingData) {
      novaLista = atendimentos.map((a) =>
        a.key === editingData.key ? atendimentoFinal : a
      );
    } else {
      novaLista = [...atendimentos, atendimentoFinal];
    }

    setAtendimentos(novaLista);
    salvarLocal(novaLista);

    setEditingData(null);
    setOpenModal(false);
  };

  // === EXCLUIR ===
  const handleDelete = (id) => {
    const novaLista = atendimentos.filter((a) => a.key !== id);
    setAtendimentos(novaLista);
    salvarLocal(novaLista);
  };

  // === FILTROS ===
  const filtrados = atendimentos.filter((a) => {
    const okPaciente = filtroPaciente ? a.paciente === filtroPaciente : true;
    const okData = filtroData ? a.data === filtroData : true;
    return okPaciente && okData;
  });

  return (
    <div>
      <AtendimentosHeader
        onAdd={() => {
          setEditingData(null);
          setOpenModal(true);
        }}
        pacientes={pacientes}
        onFilterPaciente={setFiltroPaciente}
        onFilterData={setFiltroData}
      />

      <AtendimentosTable
        data={filtrados}
        pacientes={pacientes}
        onEdit={(registro) => {
          setEditingData(registro);
          setOpenModal(true);
        }}
        onDelete={handleDelete}
      />

      <AtendimentoModal
        open={openModal}
        onClose={() => {
          setEditingData(null);
          setOpenModal(false);
        }}
        onSubmit={handleSubmit}
        pacientes={pacientes}
        editingData={editingData}
      />
    </div>
  );
}

export default AtendimentosList;
