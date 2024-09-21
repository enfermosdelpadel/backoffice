import { useMemo } from "react"

export default function useColumns() {
  const columns = useMemo(
    () => [
      {
        Header: "Creación",
        accessor: "created_at",
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
      {
        Header: "Color",
        accessor: "color",
      },
      {
        Header: "Talla",
        accessor: "size",
      },
      {
        Header: "Costo",
        accessor: "cost",
      },
      {
        Header: "Precio",
        accessor: "price",
      },
      {
        Header: "Stock",
        accessor: "stock",
      },
    ],
    []
  )

  return columns
}
