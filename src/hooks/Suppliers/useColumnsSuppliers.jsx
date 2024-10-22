import { useMemo } from "react"

export default function useColumnsSuppliers() {
  const columns = useMemo(
    () => [
      {
        Header: "Nombre",
        accessor: "name",
      },
      {
        Header: "Compañia",
        accessor: "company",
      },
      {
        Header: "Correo",
        accessor: "email",
      },
      {
        Header: "Telefono",
        accessor: "phone",
      },
      {
        Header: "Dirección",
        accessor: "address",
      },
    ],
    []
  )

  return columns
}
