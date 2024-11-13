import { useMemo } from "react"

export default function useColumnsPurchases() {
  const columns = useMemo(
    () => [
      {
        Header: "Fecha de Compra",
        accessor: "purchase_date",
        width: 200,
      },
      {
        Header: "Proveedor",
        accessor: "supplier",
      },

      {
        Header: "Producto",
        accessor: "product",
        width: 500,
      },
      {
        Header: "Tipo",
        accessor: "type",
      },
      {
        Header: () => (
          <div
            style={{
              textAlign: "center",
            }}
          >
            Talla
          </div>
        ),
        accessor: "size",
        Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
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
        Header: () => (
          <div
            style={{
              textAlign: "center",
            }}
          >
            Cantidad
          </div>
        ),
        accessor: "quantity",
        Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
      },
      {
        Header: () => (
          <div
            style={{
              textAlign: "right",
            }}
          >
            Costo Unitario
          </div>
        ),
        accessor: "cost",
        Cell: (row) => <div style={{ textAlign: "right" }}>{row.value}</div>,
      },
      {
        Header: () => (
          <div
            style={{
              textAlign: "right",
            }}
          >
            Costo Total
          </div>
        ),
        accessor: "total_cost",
        Cell: (row) => <div style={{ textAlign: "right" }}>{row.value}</div>,
      },
    ],
    []
  )

  return columns
}
