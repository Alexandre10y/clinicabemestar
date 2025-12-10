import { useEffect, useState } from "react";
import { Bar } from "@ant-design/plots";

function AtendimentosSemanaChart() {
  const [data, setData] = useState([]);

  const user = JSON.parse(localStorage.getItem("userLogged"));
  const userId = user?.key;
  const atendimentosKey = `atendimentos-${userId}`;

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(atendimentosKey)) || [];

    const dias = [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
    ];

    const contagem = {};

    stored.forEach((a) => {
      const d = new Date(a.data);
      const diaSemana = dias[d.getDay()];
      contagem[diaSemana] = (contagem[diaSemana] || 0) + 1;
    });

    const formatado = dias.map((dia) => ({
      dia,
      quantidade: contagem[dia] || 0,
    }));

    setData(formatado);
  }, []);

  const config = {
    data,
    xField: "quantidade",
    yField: "dia",
    seriesField: "dia",
    colorField: "dia",
    legend: false,
  };

  return (
    <div>
      <h3 style={{ marginBottom: 10 }}>Atendimentos por Dia da Semana</h3>
      <Bar {...config} />
    </div>
  );
}

export default AtendimentosSemanaChart;
