import { useContext, useMemo } from "react"
import { DataContext } from "../../context/DataContext"

export default function useRowsStock() {
  const { stock } = useContext(DataContext)

  const rows = useMemo(
    () =>
      stock.map((item) => ({
        id: item.product_id,
        type: item.type,
        product: item.sub_type + " " + item.brand + " " + item.model,
        size: item.size,
        color: item.color,
        gender: item.gender,
        stock: item.stock,
        price:
          item.price !== undefined && typeof item.price === "number"
            ? item.price.toLocaleString("es-ES", {
                useGrouping: true,
              })
            : "",
      })),
    [stock] // add this dependency array
  )

  return rows
}
