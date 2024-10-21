import { useContext, useMemo } from "react"
import { DataContext } from "../context/DataContext"

export default function useRowsPurchases() {
  const { purchases } = useContext(DataContext)

  const rows = useMemo(
    () =>
      purchases.map((item) => ({
        id: item.id,
        purchase_date: new Date(item.purchase_date).toLocaleDateString(
          "es-ES",
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ),
        supplier: item.suppliers.company,
        product:
          item.products.type +
          " " +
          item.products.subType +
          " " +
          item.products.model,
        size: item.sizes.name,
        color: item.colors.name,
        gender: item.genders.name,
        quantity: item.quantity,
        cost: item.total_cost,
        total_cost: item.total_cost,
      })),
    [purchases] // add this dependency array
  )

  return rows
}
