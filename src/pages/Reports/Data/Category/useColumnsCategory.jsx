import { useMemo } from "react"

export default function useColumnsCategory() {
  const columns = useMemo(
    () => [
      {
        Header: "Tipo",
        accessor: "type",
      },
      {
        Header: "Nombre",
        accessor: "categoryKey",
        width: 350,
      },
      {
        Header: () => <div style={{ textAlign: "center" }}>Compras</div>,
        accessor: "purchased",
        Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
      },
      {
        Header: () => <div style={{ textAlign: "center" }}>Ventas</div>,
        accessor: "sold",
        Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
      },
      {
        Header: () => (
          <div style={{ textAlign: "center" }}>Stock Disponible</div>
        ),
        accessor: "stock",
        Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
      },
      {
        Header: () => <div style={{ textAlign: "right" }}>Total Compras</div>,
        accessor: "totalPurchased",
        Cell: (row) => <div style={{ textAlign: "right" }}>{row.value}</div>,
      },
      {
        Header: () => (
          <div
            style={{
              textAlign: "right",
            }}
          >
            Total Ventas
          </div>
        ),
        accessor: "totalSold",
        Cell: (row) => <div style={{ textAlign: "right" }}>{row.value}</div>,
      },
      {
        Header: () => (
          <div
            style={{
              textAlign: "right",
            }}
          >
            Ganancias
          </div>
        ),
        accessor: "earns",
        Cell: (row) => <div style={{ textAlign: "right" }}>{row.value}</div>,
      },
    ],
    []
  )

  return columns
}
