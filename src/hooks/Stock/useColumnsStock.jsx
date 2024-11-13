import { useMemo } from "react"

export default function useColumnsStock() {
  const columns = useMemo(
    () => [
      {
        Header: "Producto",
        accessor: "product",
        width: 300,
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
        accessor: "stock",
        Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
      },

      {
        Header: () => (
          <div
            style={{
              textAlign: "right",
            }}
          >
            Precio
          </div>
        ),
        accessor: "price",
        Cell: (row) => <div style={{ textAlign: "right" }}>{row.value}</div>,
      },
    ],
    []
  )

  return columns
}
