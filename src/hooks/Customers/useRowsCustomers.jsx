import { useContext, useMemo } from "react"
import { DataContext } from "../../context/DataContext"

export default function useRowsCustomers() {
  const { profile } = useContext(DataContext)

  const customers = useMemo(
    () => profile.filter((item) => item.is_customer),
    [profile]
  )

  const rows = useMemo(
    () =>
      customers.map((item) => ({
        id: item.id,
        name: item.first_name + " " + item.last_name,
        email: item.email,
        address: item.address,
        phone: item.phone,
        dni: item.dni,
      })),
    [customers]
  )

  return rows
}
