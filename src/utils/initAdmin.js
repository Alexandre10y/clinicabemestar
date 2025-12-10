export function initAdmin() {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  if (usuarios.length === 0) {
    const adminDefault = {
      key: Date.now(),
      nome: "Administrador",
      email: "admin@admin.com",
      senha: "123456",
      tipo: "admin",
      telefone: ""
    };

    localStorage.setItem("usuarios", JSON.stringify([adminDefault]));
    console.log("Admin recriado automaticamente");
  }
}
