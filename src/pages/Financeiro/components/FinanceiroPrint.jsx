// Este componente apenas prepara a área imprimível.
// Você não precisa alterar nada aqui.

function FinanceiroPrint({ children }) {
  return (
    <div id="print-area" style={{ display: "none" }}>
      {children}
    </div>
  );
}

export default FinanceiroPrint;
