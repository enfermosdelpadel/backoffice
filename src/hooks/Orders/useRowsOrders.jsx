import { useContext, useMemo } from "react"
import { DataContext } from "../../context/DataContext"

export default function useRowsOrders() {
  const { orders, setOrderId } = useContext(DataContext)

  const rows = useMemo(
    () =>
      orders.map((sale) => ({
        id: sale.id,
        order_number: (
          <button onClick={() => setOrderId(sale.id)}>
            {sale.order_number}
          </button>
        ),
        customer:
          sale.customers && sale.customers.name ? sale.customers.name : "",
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
        status: sale.status,
      })),
    [orders, setOrderId]
  )

  return rows
}
