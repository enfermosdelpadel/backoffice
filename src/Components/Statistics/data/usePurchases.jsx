import { DataContext } from "../../../context/DataContext"
import { useContext } from "react"
import { useMemo } from "react"

export const usePurchases = () => {
  const { purchases } = useContext(DataContext)

  const purchasesByMonth = useMemo(() => {
    const result = purchases.reduce((acc, purchase) => {
      const date = new Date(purchase.purchase_date)
      const month = date.toLocaleString("es-AR", { month: "long" })
      const existingMonth = acc.find((item) => item.month === month)
      if (existingMonth) {
        existingMonth.count += 1
      } else {
        acc.push({ month, count: 1 })
      }
      return acc
    }, [])
    return result
  }, [purchases])
  return purchasesByMonth
}
