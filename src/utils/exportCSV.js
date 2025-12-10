import dayjs from "dayjs";

export function exportToCSV(data, fileName = "financeiro.csv") {
  if (!data || data.length === 0) return;

  const header = [
    "Paciente",
    "Data",
    "Hora",
    "Profissional",
    "Serviço",
    "Valor",
    "Status",
    "Observações",
  ];

  const rows = data.map((a) => [
    a.pacienteNome || "",
    dayjs(a.data).format("DD/MM/YYYY"),
    a.hora,
    a.profissional,
    a.servico,
    Number(a.valor).toFixed(2),
    a.status,
    a.obs || "",
  ]);

  // 🔥 Adicionar BOM (Byte Order Mark) para Excel ler UTF-8 corretamente
  const BOM = "\uFEFF";

  let csvContent =
    BOM + [header, ...rows].map((e) => e.join(";")).join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
