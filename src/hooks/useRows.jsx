import { useContext, useMemo } from "react"
import { DataContext } from "../context/DataContext"

export default function useRows() {
  const { products } = useContext(DataContext)

  const rows = useMemo(
    () =>
      products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        stock: product.stock,
        category: product.category,
        created_at: new Date(product.created_at).toLocaleDateString("es-ES", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        }),
        brand: product.brand,
        color: product.color,
        gender: product.gender,
        size: product.size,
        cost: product.cost,
        type: product.type,
        subType: product.subType,
        model: product.model,
      })),
    [products] // add this dependency array
  )

  return rows
}
