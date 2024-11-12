import { DataContext } from "../../../context/DataContext"
import { useContext } from "react"
import { useMemo } from "react"

export default function useSalesByDate() {
  const { orders } = useContext(DataContext)

  const salesByDate = useMemo(() => {
    const result = orders.reduce((acc, order) => {
      const date = new Date(order.order_date).toLocaleDateString("es-ES", {
        day: "numeric",
      })
      const existingDate = acc.find((item) => item.date === date)
      if (existingDate) {
        existingDate.count += 1
        existingDate.totalAmount += order.total
      } else {
        acc.push({ date, count: 1, totalAmount: order.total })
      }
      return acc
    }, [])
    return result
  }, [orders])
  return salesByDate
}