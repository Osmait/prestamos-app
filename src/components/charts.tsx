import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Reporte Mensual",
    },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export function Charts() {
  const mesesIncome = [0, 0, 0, 0, , 0, 0, 0, 0, 0, 0, 0];
  const mesesBill = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  for (let i = 0; i <= 12; i++) {
    mesesBill[i] = i * 1000;
    mesesIncome[i] = i * 2000;
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Gastos",
        data: mesesBill,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Ingresos",
        data: mesesIncome,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
