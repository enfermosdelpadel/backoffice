import { DataContext } from "../../../context/DataContext"
import { useContext } from "react"
import { useMemo } from "react"

export default function useProductsByCategory() {
  const { stock } = useContext(DataContext)

  const productsByCategory = useMemo(() => {
    const result = stock.reduce((acc, product) => {
      const existingCategory = acc.find(
        (item) => item.category === product.type
      )
      if (existingCategory) {
        existingCategory.count += product.stock
      } else {
        acc.push({ category: product.type, count: product.stock })
      }
      return acc
    }, [])
    return result
  }, [stock])
  return productsByCategory
}
