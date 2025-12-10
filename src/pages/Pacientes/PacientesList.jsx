/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import PacientesHeader from "./components/PacientesHeader";
import PacientesTable from "./components/PacientesTable";
import PacienteModal from "./components/PacienteModal";
import { isCpfDuplicado, normalizeCPF } from "./utils/CpfValidator";
import { message } from "antd";

function PacientesList() {
  const [openModal, setOpenModal] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [editingData, setEditingData] = useState(null);
  const [search, setSearch] = useState("");

  // === USUÁRIO LOGADO ===
  const user = JSON.parse(localStorage.getItem("userLogged"));
  const userId = user?.key;

  const pacientesKey = userId ? `pacientes-${userId}` : null;

  // === CARREGAR PACIENTES DO LOCALSTORAGE ===
  useEffect(() => {
    if (!userId) return; // <- Correto: pode sair dentro do hook
    const stored = JSON.parse(localStorage.getItem(pacientesKey)) || [];
    setPacientes(stored);
  }, [userId]);

  // Se NÃO houver userId, renderiza só a mensagem (mas sem impedir hooks acima)
  if (!userId) {
    return <div>Erro: Nenhum usuário logado.</div>;
  }

  // === SALVAR LISTA PARA O USUÁRIO ===
  const salvar = (lista) => {
    localStorage.setItem(pacientesKey, JSON.stringify(lista));
  };

  // === CRIAR / EDITAR PACIENTE ===
  const handleSubmit = (values) => {
    const cpfNormalizado = normalizeCPF(values.cpf);

    const duplicado = isCpfDuplicado(
      cpfNormalizado,
      pacientes,
      editingData?.key || null
    );

    if (duplicado) {
      message.error("Já existe um cliente cadastrado com este CPF!");
      return;
    }

    let novaLista;

    if (editingData) {
      novaLista = pacientes.map((p) =>
        p.key === editingData.key
          ? { ...p, ...values, cpf: cpfNormalizado }
          : p
      );
    } else {
      novaLista = [
        ...pacientes,
        { ...values, cpf: cpfNormalizado, key: Date.now() },
      ];
    }

    setPacientes(novaLista);
    salvar(novaLista);

    setEditingData(null);
    setOpenModal(false);
  };

  // === EXCLUIR ===
  const handleDelete = (id) => {
    const novaLista = pacientes.filter((p) => p.key !== id);
    setPacientes(novaLista);
    salvar(novaLista);
  };

  // === EDITAR ===
  const handleEdit = (cliente) => {
    setEditingData(cliente);
    setOpenModal(true);
  };

  // === FILTRO DE BUSCA ===
  const filtered = pacientes.filter((p) =>
    p.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <PacientesHeader
        onAdd={() => {
          setEditingData(null);
          setOpenModal(true);
        }}
        onSearch={setSearch}
      />

      <PacientesTable
        data={filtered}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <PacienteModal
        open={openModal}
        onClose={() => {
          setEditingData(null);
          setOpenModal(false);
        }}
        onSubmit={handleSubmit}
        editingData={editingData}
      />
    </div>
  );
}

export default PacientesList;
