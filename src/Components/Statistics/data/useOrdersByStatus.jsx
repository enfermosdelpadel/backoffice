import { DataContext } from "../../../context/DataContext"
import { useContext } from "react"
import { useMemo } from "react"

export default function useOrdersByStatus() {
  const { orders } = useContext(DataContext)

  const ordersByStatus = useMemo(() => {
    const result = orders.reduce((acc, order) => {
      const existingStatus = acc.find((item) => item.status === order.status)
      if (existingStatus) {
        existingStatus.count += 1
      } else {
        acc.push({ status: order.status, count: 1 })
      }
      return acc
    }, [])
    return result
  }, [orders])
  return ordersByStatus
}
