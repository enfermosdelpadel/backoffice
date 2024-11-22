import { useMemo } from "react"

export default function useColumnsOrders() {
  const columns = useMemo(
    () => [
      {
        Header: "N Orden",
        accessor: "orderNumber",
      },
      {
        Header: "Fecha",
        accessor: "date",
      },
      {
        Header: "Cliente",
        accessor: "customer",
      },
      {
        Header: "Tipo",
        accessor: "type",
      },
      {
        Header: "Producto",
        accessor: "product",
        width: 300,
      },
      {
        Header: () => <div style={{ textAlign: "right" }}>Cantidad</div>,
        accessor: "quantity",
        Cell: (row) => <div style={{ textAlign: "right" }}>{row.value}</div>,
      },
      {
        Header: () => (
          <div
            style={{
              textAlign: "right",
            }}
          >
            Gasto
          </div>
        ),
        accessor: "value",
        Cell: (row) => <div style={{ textAlign: "right" }}>{row.value}</div>,
      },
    ],
    []
  )

  return columns
}
