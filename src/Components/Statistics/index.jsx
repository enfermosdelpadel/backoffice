import { defaults } from "chart.js/auto"
import { Bar, Doughnut, Line } from "react-chartjs-2"
import { GlobalInfo } from "../GlobalInfo"
import useSalesByDate from "./data/useSalesByDate"
import useProductsByCategory from "./data/useProductsByCategory"
import useOrdersByStatus from "./data/useOrdersByStatus"
import useOrdersByUser from "./data/useOrdersByUser"
import useReportProducs from "../../pages/Reports/Data/Category/useReportProducs"

import "./index.css"
import { TableLowStock } from "../TableLowStock"

defaults.maintainAspectRatio = false
defaults.responsive = true

defaults.plugins.title.display = true
defaults.plugins.title.align = "start"
defaults.plugins.title.font.size = 20
defaults.plugins.title.color = "black"

function Statistics() {
  //Hooks useMemo
  const salesByDate = useSalesByDate()
  const productsByCategory = useProductsByCategory()
  const ordersByStatus = useOrdersByStatus()
  const ordersByUser = useOrdersByUser()
  const reportProducs = useReportProducs()
  const totalEarned = reportProducs.reduce(
    (acc, item) => acc + (item.earns > 0 ? item.earns : 0),
    0
  )
  const totalPurchased = reportProducs.reduce(
    (acc, item) => acc + (item.totalPurchased > 0 ? item.totalPurchased : 0),
    0
  )
  const totalSold = reportProducs.reduce(
    (acc, item) => acc + (item.totalSold > 0 ? item.totalSold : 0),
    0
  )
  const lowStock = reportProducs
    .map((item) => ({
      product: item.categoryKey,
      stock: item.stock,
    }))
    .filter((item) => item.stock < 3)

  return (
    <div className="App">
      <div className="dataCard categoryCard">
        <GlobalInfo
          totalEarned={totalEarned}
          totalPurchased={totalPurchased}
          totalSold={totalSold}
        />
      </div>
      <div className="dataCard categoryCard">
        <Line
          data={{
            labels: salesByDate?.map((data) => data.date),

            datasets: [
              {
                label: "Ventas Diarias",
                data: salesByDate?.map((data) => data.totalAmount),
                backgroundColor: "#FF3030",
                borderColor: "#FF3030",
                pointBackgroundColor: "#FF3030",
                pointBorderColor: "#FF3030",
              },
            ],
          }}
          options={{
            elements: {
              line: {
                tension: 0.5,
              },
            },
            plugins: {
              title: {
                text: "Ventas Mensuales",
              },
            },
          }}
        />
      </div>
      <div className="dataCard categoryCard">
        <Bar
          data={{
            labels: ordersByUser.map((data) => data.username),
            datasets: [
              {
                label: "Cantidad de ordenes",
                data: ordersByUser.map((data) => data.count),
                backgroundColor: [
                  "rgba(43, 63, 229, 0.8)",
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(253, 135, 135, 0.8)",
                  "rgba(34, 197, 94, 0.8)",
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(43, 63, 229, 0.8)",
                  "rgba(253, 135, 135, 0.8)",
                  "rgba(34, 197, 94, 0.8)",
                ],
                borderRadius: 5,
              },
            ],
          }}
          options={{
            indexAxis: "y",

            plugins: {
              title: {
                text: "Ventas por usuario",
              },
            },
          }}
        />
      </div>
      <div className="dataCard categoryCard">
        <TableLowStock lowStock={lowStock} />
      </div>

      <div className="dataCard categoryCard">
        <Bar
          data={{
            labels: productsByCategory.map((data) => data.category),
            datasets: [
              {
                label: "Tipos de Productos",
                data: productsByCategory.map((data) => data.count),
                backgroundColor: [
                  "rgba(43, 63, 229, 0.8)",
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(253, 135, 135, 0.8)",
                  "rgba(34, 197, 94, 0.8)",
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(43, 63, 229, 0.8)",
                  "rgba(253, 135, 135, 0.8)",
                  "rgba(34, 197, 94, 0.8)",
                ],
                borderRadius: 5,
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: "Productos en Stock por categoría",
              },
            },
          }}
        />
      </div>

      <div className="dataCard categoryCard">
        <Doughnut
          data={{
            labels: ordersByStatus.map((data) => data.status),
            datasets: [
              {
                label: "Count",
                data: ordersByStatus.map((data) => data.count),
                backgroundColor: [
                  "rgba(250, 192, 19, 0.8)", // Pendiente
                  "rgba(43, 63, 229, 0.8)", // Enviado
                  "rgba(253, 135, 135, 0.8)", // Cancelado
                  "rgba(34, 197, 94, 0.8)", // Entregado
                ],
                borderColor: [
                  "rgba(250, 192, 19, 0.8)", // Pendiente
                  "rgba(43, 63, 229, 0.8)", // Enviado
                  "rgba(253, 135, 135, 0.8)", // Cancelado
                  "rgba(34, 197, 94, 0.8)", // Entregado
                ],
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: "Estado de los Pedidos",
              },
            },
          }}
        />
      </div>
    </div>
  )
}

export default Statistics
