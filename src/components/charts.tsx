import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
        label: "Ingresos",
        data: mesesIncome,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
}
