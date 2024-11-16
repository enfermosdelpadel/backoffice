import { useMemo } from "react"

export default function useColumnsCustomers() {
  const columns = useMemo(
    () => [
      {
        Header: "Nombre",
        accessor: "name",
      },

      {
        Header: "Correo",
        accessor: "email",
      },
      {
        Header: "Direccion",
        accessor: "address",
      },
      {
        Header: "Teléfono",
        accessor: "phone",
      },
      {
        Header: "DNI",
        accessor: "dni",
      },
    ],
    []
  )

  return columns
}
