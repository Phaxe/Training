"use client";
import { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PieController, ArcElement } from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useGetOrdersQuery } from "@/Redux/slices/ordersApiSlice";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PieController, ArcElement, ChartDataLabels);

export default function Statistics() {

  const {
    data: orders = [],
    isLoading: loading,
    error,
  } = useGetOrdersQuery();
  const errorMessage = error
  ? "status" in error
    ? `Error ${error.status}: ${JSON.stringify(error.data)}`
    : error.message || "An unknown error occurred"
  : null;
  const [chartData, setChartData] = useState({
    labels: ["Active", "Inactive"],
    datasets: [
      {
        label: "Order Status",
        data: [0, 0],
        backgroundColor: ["rgba(0, 171, 198, 0.3)", "rgba(245, 63, 63, 0.3)"],
        borderColor: ["rgba(0, 171, 198, 1)", "rgba(245, 63, 63, 1)"],
        borderWidth: 1,
      },
    ],
  });

  const [pieChartData, setPieChartData] = useState({
    labels: ["Accept", "Reject", "Escalate", "Undecided"],
    datasets: [
      {
        label: "Decision Status",
        data: [0, 0, 0, 0],
        backgroundColor: ["rgba(0, 203, 0, 0.3)", "rgba(255, 99, 132, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(201, 203, 207, 0.2)"],
        borderColor: ["rgba(0, 203, 0, 1)", "rgba(255, 99, 132, 1)", "rgba(255, 206, 86, 1)", "rgba(201, 203, 207, 1)"],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    if (!loading && !error && orders.length > 0) {
      const activeOrders = orders.filter(order => order.active).length;
      const inactiveOrders = orders.length - activeOrders;

      setChartData({
        labels: ["Active", "Inactive"],
        datasets: [
          {
            label: "Order Status",
            data: [activeOrders, inactiveOrders],
            backgroundColor: ["rgba(0, 171, 198, 0.3)", "rgba(245, 63, 63, 0.3)"],
            borderColor: ["rgba(0, 171, 198, 1)", "rgba(245, 63, 63, 1)"],
            borderWidth: 1,
          },
        ],
      });

      const decisionCounts = {
        accept: 0,
        reject: 0,
        escalate: 0,
        undecided: 0,
      };

      orders.forEach(order => {
        if (order.decision === "accept") decisionCounts.accept++;
        else if (order.decision === "reject") decisionCounts.reject++;
        else if (order.decision === "escalate") decisionCounts.escalate++;
        else decisionCounts.undecided++;
      });

      setPieChartData({
        labels: ["Accept", "Reject", "Escalate", "Undecided"],
        datasets: [
          {
            label: "Decision Status",
            data: [decisionCounts.accept, decisionCounts.reject, decisionCounts.escalate, decisionCounts.undecided],
            backgroundColor: ["rgba(0, 203, 0, 0.3)", "rgba(255, 99, 132, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(201, 203, 207, 0.2)"],
            borderColor: ["rgba(0, 203, 0, 1)", "rgba(255, 99, 132, 1)", "rgba(255, 206, 86, 1)", "rgba(201, 203, 207, 1)"],
            borderWidth: 1,
          },
        ],
      });
    }
  }, [orders, loading, error]);

  if (loading) {
    return (
      <div className="  text-center">
        <h2 className="text-2xl font-bold mb-4">Order Statistics</h2>
        <p>Loading data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Order Statistics</h2>
        <p>Error: {errorMessage}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="w-full max-w-xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Order Statistics</h2>
        <p>No data available.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Order Statistics</h2>
      <Bar
        data={chartData}
        options={{
          responsive: true,
        }}
      />
      <h2 className="text-2xl font-bold mt-8 mb-4">Decision Status</h2>
      <Pie
        data={pieChartData}
        options={{
          responsive: true,
          plugins: {
            datalabels: {
              color: '#333',
              font: {
                size: 12,
              },
              formatter: (value, ctx) => {
                const total = ctx.dataset.data
                  .filter((val): val is number => typeof val === "number") // Ensure only numbers are considered
                  .reduce((acc, val) => acc + val, 0);
                
                const percentage = total > 0 ? ((value / total) * 100).toFixed(2) + "%" : "0%";
                return percentage;
              },
            },
          },
        }}
      />
    </div>
  );
}