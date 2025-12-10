// Normaliza CPF tirando pontos e traços
export function normalizeCPF(cpf) {
  if (!cpf) return ""; // evita o erro
  return cpf.replace(/[.\-]/g, "").trim();
}

// Verifica duplicação
export function isCpfDuplicado(cpf, listaPacientes, ignoreId = null) {
  const cpfNormalizado = normalizeCPF(cpf);

  return listaPacientes.some((p) => {
    if (!p.cpf) return false; // evita comparar dados antigos sem cpf

    const cpfP = normalizeCPF(p.cpf);

    if (ignoreId && p.key === ignoreId) return false;

    return cpfP === cpfNormalizado;
  });
}
