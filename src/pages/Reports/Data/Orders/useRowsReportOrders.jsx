import { useMemo } from "react"

import useReportOrders from "./useReportOrders"

export default function useRowsOrders() {
  const reportOrders = useReportOrders()

  const rows = useMemo(
    () =>
      reportOrders.map((item) => ({
        orderNumber: item.orderNumber,
        date: new Date(item.date).toLocaleString("es-AR").split(",")[0],
        customer: item.customer,
        type: item.type,
        product: item.product,
        quantity: item.quantity,
        value:
          item.value !== undefined && typeof item.value === "number"
            ? item.value.toLocaleString("es-AR", {
                maximumFractionDigits: 2,
                style: "currency",
                currency: "ARS",
                useGrouping: true,
              })
            : "",
      })),
    [reportOrders]
  )

  return rows
}
