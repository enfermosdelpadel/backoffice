import { useContext, useMemo } from "react"
import { DataContext } from "../../context/DataContext"

export default function useRowsProdutcs() {
  const { products } = useContext(DataContext)

  const rows = useMemo(
    () =>
      products.map((product) => ({
        id: product.id,
        product_name:
          product.type +
          " " +
          product.subType +
          " " +
          product.brand +
          " " +
          product.model,
        created_at: new Date(product.created_at).toLocaleDateString("es-ES", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        }),
        brand: product.brand,
        type: product.type,
        subType: product.subType,
        model: product.model,
      })),
    [products] // add this dependency array
  )

  return rows
}
