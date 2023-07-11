import { transactionInterface } from "@/interface/transaction";
import { getAllTransaction } from "@/pages/api/transactions";
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
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

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
  const [dataAnual, setDataAnual] = useState<transactionInterface[]>([]);
  const mesesIncome = Array(12).fill(0);

  useEffect(() => {
    const getTransaction = async () => {
      const token = Cookies.get("token");
      const data = await getAllTransaction(token!);

      setDataAnual(data);
    };
    getTransaction();
  }, []);

  if (dataAnual) {
    for (let v of dataAnual) {
      let index = Number(v.CreateAt[1]);

      mesesIncome[index - 1] += v.amount!;
    }
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
