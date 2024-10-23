import { useMemo } from "react"

export default function useColumnsOrders() {
  const columns = useMemo(
    () => [
      {
        Header: "Número de Orden",
        accessor: "order_id",
      },

      {
        Header: "Fecha de Compra",
        accessor: "order_date",
      },
      {
        Header: "Total",
        accessor: "total",
      },
      {
        Header: "Cliente",
        accessor: "customer",
      },

      {
        Header: "Estado de Envío",
        accessor: "status",
      },
    ],
    []
  )

  return columns
}
