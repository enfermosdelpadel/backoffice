import { useMemo } from "react"

export default function useColumns() {
  const columns = useMemo(
    () => [
      {
        Header: "Nombre",
        accessor: "name",
      },
      {
        Header: "DNI",
        accessor: "dni",
      },
      {
        Header: "Correo",
        accessor: "email",
      },
      {
        Header: "Teléfono",
        accessor: "phone",
      },

      {
        Header: "Direccion",
        accessor: "address",
      },
    ],
    []
  )

  return columns
}
