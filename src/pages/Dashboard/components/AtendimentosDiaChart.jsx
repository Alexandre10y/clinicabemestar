import { useEffect, useState } from "react";
import { Column } from "@ant-design/plots";

function AtendimentosDiaChart() {
  const [data, setData] = useState([]);

  const user = JSON.parse(localStorage.getItem("userLogged"));
  const userId = user?.key;
  const atendimentosKey = `atendimentos-${userId}`;

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(atendimentosKey)) || [];

    const contagem = {};

    stored.forEach((a) => {
      contagem[a.hora] = (contagem[a.hora] || 0) + 1;
    });

    const formatado = Object.entries(contagem).map(([hora, qtde]) => ({
      hora,
      quantidade: qtde,
    }));

    // ordenar por horário
    formatado.sort((a, b) => a.hora.localeCompare(b.hora));

    setData(formatado);
  }, []);

  const config = {
    data,
    xField: "hora",
    yField: "quantidade",
    color: "#1677ff",
    columnWidthRatio: 0.5,
  };

  return (
    <div>
      <h3 style={{ marginBottom: 10 }}>Atendimentos por Horário</h3>
      <Column {...config} />
    </div>
  );
}

export default AtendimentosDiaChart;
