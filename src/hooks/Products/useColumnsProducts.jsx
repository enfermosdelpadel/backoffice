import { useMemo } from "react"

export default function useColumns() {
  const columns = useMemo(
    () => [
      {
        Header: "Creación",
        accessor: "created_at",
      },
      {
        Header: "Nombre",
        accessor: "product_name",
      },
      {
        Header: "Marca",
        accessor: "brand",
      },
      {
        Header: "Modelo",
        accessor: "model",
      },

      {
        Header: "Tipo",
        accessor: "type",
      },
      {
        Header: "SubTipo",
        accessor: "subType",
      },
    ],
    []
  )

  return columns
}
