import { useContext, useMemo } from "react"
import { DataContext } from "../../context/DataContext"

export default function useRowsSuppliers() {
  const { profile } = useContext(DataContext)

  const rows = useMemo(
    () =>
      profile.map((item) => ({
        id: item.id,
        name: item.first_name + " " + item.last_name,
        email: item.email,
        address: item.address,
        dni: item.dni,
      })),
    [profile] // add this dependency array
  )

  return rows
}
