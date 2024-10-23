import { useContext, useMemo } from "react"
import { DataContext } from "../../context/DataContext"

export default function useRowsOrders() {
  const { sales } = useContext(DataContext)

  const rows = useMemo(
    () =>
      sales.map((sale) => ({
        id: sale.id,
        name: sale.name,
        email: sale.email,
        address: sale.address,
        phone: sale.phone,
      })),
    [sales] // add this dependency array
  )

  return rows
}
