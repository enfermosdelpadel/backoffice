import { useContext, useMemo } from "react"
import { DataContext } from "../../context/DataContext"

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
        supplier: item.suppliers ? item.suppliers.company : "",
        type: item.products ? item.products.type : "",
        product: item.products
          ? item.products.sub_type +
            " " +
            item.products.model +
            " " +
            item.products.brand
          : "",
        size: item.sizes && item.sizes.name ? item.sizes.name : "",
        color: item.colors && item.colors.name ? item.colors.name : "",
        gender:
          item.products && item.products.gender ? item.products.gender : "",
        quantity: item.quantity,
        cost:
          item.uni_cost !== undefined && typeof item.uni_cost === "number"
            ? item.uni_cost.toLocaleString("es-AR", {
                maximumFractionDigits: 2,
                style: "currency",
                currency: "ARS",
                useGrouping: true,
              })
            : "",
        total_cost:
          item.total_cost !== undefined && typeof item.total_cost === "number"
            ? item.total_cost.toLocaleString("es-AR", {
                maximumFractionDigits: 2,
                style: "currency",
                currency: "ARS",
                useGrouping: true,
              })
            : "",
      })),
    [purchases]
  )

  return rows
}
