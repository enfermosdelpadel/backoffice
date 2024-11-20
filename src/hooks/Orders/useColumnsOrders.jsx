import { useMemo } from "react"

export default function useColumnsOrders() {
  const columns = useMemo(
    () => [
      {
        Header: "Número de Orden",
        accessor: "order_number",
      },
      {
        Header: "Fecha de Compra",
        accessor: "order_date",
      },
      {
        Header: "Cliente",
        accessor: "customer",
      },

      {
        Header: () => <div style={{ textAlign: "right" }}>Total</div>,
        accessor: "total",
        Cell: (row) => <div style={{ textAlign: "right" }}>{row.value}</div>,
      },

      {
        Header: () => (
          <div style={{ textAlign: "center" }}>Estado de Envío</div>
        ),
        accessor: "status",
        Cell: (row) => <div style={{ textAlign: "center" }}>{row.value}</div>,
      },
    ],
    []
  )

  return columns
}
