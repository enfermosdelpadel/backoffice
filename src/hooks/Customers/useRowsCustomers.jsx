import { useContext, useMemo } from "react"
import { DataContext } from "../../context/DataContext"

export default function useRowsCustomers() {
  const { customers } = useContext(DataContext)

  const rows = useMemo(
    () =>
      customers.map((customer) => ({
        id: customer.id,
        name: customer.name,
        email: customer.email,
        address: customer.address,
        phone: customer.phone,
      })),
    [customers]
  )

  return rows
}
