import { useEffect, useState } from "react";
import { message } from "antd";
import UsuariosHeader from "./components/UsuariosHeader";
import UsuariosTable from "./components/UsuariosTable";
import UsuarioModal from "./components/UsuarioModal";

function UsuariosList() {
  const [openModal, setOpenModal] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [editingData, setEditingData] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("usuarios")) || [];
    setUsuarios(stored);
  }, []);

  const salvarLocal = (lista) => {
    localStorage.setItem("usuarios", JSON.stringify(lista));
  };

  const emailExiste = (email, ignoreId = null) =>
    usuarios.some(u => u.email === email && u.key !== ignoreId);

  const handleSubmit = (registro) => {
    if (emailExiste(registro.email, editingData?.key)) {
      message.error("Este e-mail já está cadastrado!");
      return;
    }

    let novaLista;

    if (editingData) {
      novaLista = usuarios.map((u) =>
        u.key === editingData.key ? { ...registro, key: editingData.key } : u
      );

      message.success("Usuário atualizado!");
    } else {
      const novo = { ...registro, key: Date.now() };
      novaLista = [...usuarios, novo];
      message.success("Usuário cadastrado!");
    }

    setUsuarios(novaLista);
    salvarLocal(novaLista);

    setEditingData(null);
    setOpenModal(false);
  };

  const handleDelete = (id) => {
    const novaLista = usuarios.filter((u) => u.key !== id);
    setUsuarios(novaLista);
    salvarLocal(novaLista);
    message.success("Usuário removido!");
  };

  return (
    <div>
      <UsuariosHeader onAdd={() => {
        setEditingData(null);
        setOpenModal(true);
      }} />

      <UsuariosTable
        data={usuarios}
        onEdit={(registro) => {
          setEditingData(registro);
          setOpenModal(true);
        }}
        onDelete={handleDelete}
      />

      <UsuarioModal
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

export default UsuariosList;
