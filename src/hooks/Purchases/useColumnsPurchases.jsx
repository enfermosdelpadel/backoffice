import { useMemo } from "react"

export default function useColumnsPurchases() {
  const columns = useMemo(
    () => [
      {
        Header: "Fecha de Compra",
        accessor: "purchase_date",
      },
      {
        Header: "Proveedor",
        accessor: "supplier",
      },

      {
        Header: "Producto",
        accessor: "product",
      },
      {
        Header: "Tipo",
        accessor: "type",
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
        accessor: "quantity",
      },
      {
        Header: "Costo Unitario",
        accessor: "cost",
      },
      {
        Header: "Costo Total",
        accessor: "total_cost",
      },
    ],
    []
  )

  return columns
}
