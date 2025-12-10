import { Card } from "antd";

function FinanceiroResumo({ totalPeriodo, totalPago, totalPendente }) {
  return (
    <div style={{ display: "flex", gap: 20, marginBottom: 20, flexWrap: "wrap" }}>
      <Card style={{ width: 220 }}>
        <h3>Total do Período</h3>
        <strong>R$ {totalPeriodo.toFixed(2)}</strong>
      </Card>

      <Card style={{ width: 220 }}>
        <h3>Recebido (Pago)</h3>
        <strong style={{ color: "green" }}>R$ {totalPago.toFixed(2)}</strong>
      </Card>

      <Card style={{ width: 220 }}>
        <h3>Pendente</h3>
        <strong style={{ color: "red" }}>R$ {totalPendente.toFixed(2)}</strong>
      </Card>
    </div>
  );
}

export default FinanceiroResumo;
