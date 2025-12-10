export default function userUpdate(updatedUser) {
  localStorage.setItem("userLogged", JSON.stringify(updatedUser));

  // também atualiza o array de usuários
  const lista = JSON.parse(localStorage.getItem("usuarios")) || [];
  const novaLista = lista.map(u =>
    u.key === updatedUser.key ? updatedUser : u
  );

  localStorage.setItem("usuarios", JSON.stringify(novaLista));
}
