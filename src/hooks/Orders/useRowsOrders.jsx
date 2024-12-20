import { useContext, useMemo, useState } from "react"
import { DataContext } from "../../context/DataContext"

export default function useRowsOrders() {
  const {
    orders,
    setOrderId,
    setModalStatus,
    setUserEmail,
    setOrderNumber,
    setClientName,
  } = useContext(DataContext)
  const [selectedOrderId, setSelectedOrderId] = useState(null)

  const rows = useMemo(
    () =>
      orders.map((sale) => ({
        id: sale.id,
        order_number: (
          <button
            onClick={() => {
              setOrderId(sale.id)
              setSelectedOrderId(sale.id)
            }}
            className={selectedOrderId === sale.id ? "order-selected" : ""}
          >
            {sale.order_number}
          </button>
        ),
        customer:
          sale.profiles?.first_name && sale.profiles?.first_name
            ? sale.profiles?.first_name + " " + sale.profiles?.last_name
            : "",
        order_date: new Date(sale.order_date).toLocaleDateString("es-ES", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        }),
        total:
          sale.total !== undefined && typeof sale.total === "number"
            ? sale.total.toLocaleString("es-AR", {
                maximumFractionDigits: 2,
                style: "currency",
                currency: "ARS",
                useGrouping: true,
              })
            : "",
        status: (
          <span
            onClick={() => {
              setModalStatus(sale.status)
              setOrderId(sale.id)
              setUserEmail(sale.profiles?.email)
              setOrderNumber(sale.order_number)
              setClientName(sale.profiles?.first_name)
            }}
            className={
              {
                Pendiente: "bg-yellow-500",
                Enviado: "bg-blue-500",
                Entregado: "bg-green-500",
                Cancelado: "bg-red-500",
              }[sale.status] || "bg-gray-500"
            }
            style={{
              padding: "0.35rem",
              borderRadius: "0.25rem",
              cursor: "pointer",
              width: "100px",
              display: "inline-block",
              textAlign: "center",
            }}
          >
            {sale.status}
          </span>
        ),
      })),
    [
      orders,
      setOrderId,
      selectedOrderId,
      setModalStatus,
      setUserEmail,
      setOrderNumber,
      setClientName,
    ]
  )

  return rows
}
