import { defaults } from "chart.js/auto"
import { Chart } from "chart.js"
import ChartDataLabels from "chartjs-plugin-datalabels"
import "chartjs-adapter-date-fns"
import { Bar, Doughnut, Line } from "react-chartjs-2"
import DatePicker, { registerLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useState, useEffect, useContext } from "react"
import { es } from "date-fns/locale/es"
import { GlobalInfo } from "../GlobalInfo"
import useSalesByDate from "./data/useSalesByDate"
import useOrdersByStatus from "./data/useOrdersByStatus"
import useOrdersByUser from "./data/useOrdersByUser"
import useReportProducs from "../../pages/Reports/Data/Category/useReportProducs"

import { DataContext } from "../../context/DataContext"

import { CalendarIcon } from "@heroicons/react/24/outline"

import "./index.css"
import { TableShowStock } from "../TableShowStock"

registerLocale("es", es)

defaults.maintainAspectRatio = false
defaults.responsive = true

defaults.plugins.title.display = true
defaults.plugins.title.align = "start"
defaults.plugins.title.font.size = 20
defaults.plugins.title.color = "black"

function Statistics() {
  const { orders } = useContext(DataContext)
  const totalOrders = orders.length
  //Hooks useMemo
  const salesByDate = useSalesByDate()
  const ordersByStatus = useOrdersByStatus()
  const ordersByUser = useOrdersByUser()
  const reportProducs = useReportProducs()

  //Calculos
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
  const totalStock = reportProducs.reduce(
    (acc, item) => acc + (item.stock > 0 ? item.stock : 0),
    0
  )
  const lowStock = reportProducs
    .map((item) => ({
      product: item.categoryKey,
      quantity: item.stock,
    }))
    .filter((item) => item.quantity < 3)

  const mostProductSales = reportProducs
    .reduce((acc, item) => {
      const existingProduct = acc.find(
        (product) => product.product === item.categoryKey
      )
      if (existingProduct) {
        existingProduct.quantity += item.sold
      } else {
        acc.push({ product: item.categoryKey, quantity: item.sold })
      }
      return acc
    }, [])
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 10)

  //Calculos de Stock
  const [stockType, setStockType] = useState([])

  const handleRadioButtonChange = (event) => {
    setStockType(event.target.value)
  }

  const stockByType = reportProducs.reduce((acc, item) => {
    const existingType = acc.find((type) => type.type === item.type)
    if (existingType) {
      existingType.totalStock += item.stock
    } else {
      acc.push({ type: item.type, totalStock: item.stock })
    }
    return acc
  }, [])

  const stockByBrand = reportProducs
    .reduce((acc, item) => {
      const existingBrand = acc.find((brand) => brand.brand === item.brand)
      if (existingBrand) {
        existingBrand.totalStock += item.stock
      } else {
        acc.push({ brand: item.brand, totalStock: item.stock })
      }
      return acc
    }, [])
    .sort((a, b) => b.totalStock - a.totalStock)

  const stockData = stockType === "stockByType" ? stockByType : stockByBrand

  //Graficos de Ventas
  const [startDate, setStartDate] = useState(new Date("2024-11-15"))
  const [endDate, setEndDate] = useState(new Date())
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    if (salesByDate.length > 0) {
      setChartData(salesByDate)
    }
  }, [salesByDate])

  const handleDateChange = () => {
    const filteredData = salesByDate.filter(
      (data) =>
        new Date(data.date.split("/").reverse().join("-")) >= startDate &&
        new Date(data.date.split("/").reverse().join("-")) <= endDate
    )
    setChartData(filteredData)
  }

  Chart.register(ChartDataLabels)

  return (
    <div className="App">
      <div className="dataCard topCard">
        <GlobalInfo
          totalEarned={totalEarned}
          totalPurchased={totalPurchased}
          totalSold={totalSold}
          totalStock={totalStock}
          totalOrders={totalOrders}
        />
      </div>
      <div className="dataCard categoryCard">
        <Line
          data={{
            labels: chartData?.map((data) => data.date),

            datasets: [
              {
                label: "Ventas Diarias",
                data: chartData?.map((data) => data.totalAmount),
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
              legend: {
                display: false, //desabilitar leyenda
              },
              datalabels: {
                display: false,
              },
              title: {
                text: "Ventas Realizadas",
                align: "center",
              },
            },
          }}
        />
        <div className=" flex justify-center gap-1 rounded-md">
          <DatePicker
            className="w-24 "
            locale="es"
            minDate={new Date("2024-11-14")}
            maxDate={new Date()}
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat={"dd/MM/yyyy"}
          />
          <CalendarIcon className="w-6 h-6 bg-white rounded-md" />
          <DatePicker
            className="w-24"
            locale="es"
            minDate={new Date("2024-11-14")}
            maxDate={new Date()}
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat={"dd/MM/yyyy"}
          />
          <button
            className="w-20 h-6 bg-gray-200 flex items-center justify-center rounded-md hover:bg-gray-300"
            onClick={handleDateChange}
          >
            Filtrar
          </button>
        </div>
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
              datalabels: {
                align: "center",
                anchor: "center",
                color: "white",
                backgroundColor: function (context) {
                  return context.dataset.backgroundColor
                },
                borderRadius: 4,
                formatter: function (value) {
                  return value
                },
              },
              legend: {
                display: false,
              },
              title: {
                text: "Top 5 de Ventas por Cliente",
                align: "center",
              },
            },
          }}
        />
      </div>
      <div className="dataCard categoryCard">
        <TableShowStock
          data={lowStock}
          title="Productos con bajo stock"
          sortOrder="asc"
        />
      </div>

      <div className="dataCard categoryCard">
        <Bar
          data={{
            labels: stockData.map((item) => item.type || item.brand),
            datasets: [
              {
                label: "Tipos de Productos",
                data: stockData.map((data) => data.totalStock),
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
              datalabels: {
                align: "end",
                anchor: "end",
                color: "white",
                backgroundColor: function (context) {
                  return context.dataset.backgroundColor
                },
                borderRadius: 4,
                formatter: function (value) {
                  return value
                },
              },
              legend: {
                display: false,
              },
              title: {
                text: "Stock por categoría",
                align: "center",
              },
            },
          }}
        />
        <div className=" flex justify-center items-center rounded-md gap-2">
          <label className="flex items-center gap-1">
            <input
              className="w-5 "
              type="radio"
              name="stockByType"
              value="stockByType"
              checked={stockType === "stockByType"}
              onChange={handleRadioButtonChange}
            />
            Tipos
          </label>
          <label className="flex items-center gap-1">
            <input
              className="w-5 ml-2"
              type="radio"
              name="stockByBrand"
              value="stockByBrand"
              checked={stockType === "stockByBrand"}
              onChange={handleRadioButtonChange}
            />
            Marcas
          </label>
        </div>
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
              datalabels: {
                align: "center",
                anchor: "center",
                color: "white",
                backgroundColor: function (context) {
                  return context.dataset.backgroundColor
                },
                borderRadius: 4,
                formatter: function (value) {
                  return value
                },
              },
              title: {
                text: "Estado de los Pedidos",
                align: "center",
              },
            },
          }}
        />
      </div>
      <div className="dataCard categoryCard">
        <TableShowStock
          data={mostProductSales}
          title="Top 10 productos mas vendidos"
          sortOrder="desc"
        />
      </div>
    </div>
  )
}

export default Statistics
