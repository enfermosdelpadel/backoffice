import { useContext, useMemo } from "react"
import { DataContext } from "../../context/DataContext"

export default function useRowsSuppliers() {
  const { suppliers } = useContext(DataContext)

  const rows = useMemo(
    () =>
      suppliers.map((item) => ({
        id: item.id,
        company: item.company,
        name: item.name,
        email: item.email,
        phone: item.phone,
        address: item.address,
      })),
    [suppliers] // add this dependency array
  )

  return rows
}
