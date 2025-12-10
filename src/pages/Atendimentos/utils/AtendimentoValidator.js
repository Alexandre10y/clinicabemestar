// Verifica se existe atendimento duplicado para data + hora + profissional
export function isHorarioDuplicado(novo, lista, ignoreId = null) {
  if (!novo) return false;

  const data = novo.data;
  const hora = novo.hora;
  const profissional = (novo.profissional || "").toLowerCase().trim();

  return lista.some((at) => {
    if (!at) return false;

    // ignorar o próprio registro quando estiver editando
    if (ignoreId && at.key === ignoreId) return false;

    const profLista = (at.profissional || "").toLowerCase().trim();

    return (
      at.data === data &&
      at.hora === hora &&
      profLista === profissional
    );
  });
}
