import { useMemo } from "react"

export default function useColumnsStock() {
  const columns = useMemo(
    () => [
      {
        Header: "Producto",
        accessor: "product",
      },
      {
        Header: "Talla",
        accessor: "size",
      },
      {
        Header: "Color",
        accessor: "color",
      },
      {
        Header: "Genero",
        accessor: "gender",
      },
      {
        Header: "Cantidad",
        accessor: "stock",
      },
    ],
    []
  )

  return columns
}
