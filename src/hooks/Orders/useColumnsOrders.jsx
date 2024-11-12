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
        Cell: (row) => {
          const labelColors = {
            Pendiente: "bg-yellow-500",
            Enviado: "bg-blue-500",
            Entregado: "bg-green-500",
            Cancelado: "bg-red-500",
          }
          return (
            <div
              style={{ textAlign: "center" }}
              className={`px-2 py-1 w-full text-black font-semibold ${
                labelColors[row.value]
              }`}
            >
              {row.value}
            </div>
          )
        },
      },
    ],
    []
  )

  return columns
}
