import { useMemo } from "react"
import useReportProducs from "../Category/useReportProducs"

export default function useRowsCategory() {
  const reportProducs = useReportProducs()
  console.log("reportProducs", reportProducs)

  const rows = useMemo(
    () =>
      reportProducs.map((item) => ({
        categoryKey: item.categoryKey,
        purchased: item.purchased,
        sold: item.sold,
        stock: item.stock,
        totalPurchased:
          item.totalPurchased !== undefined &&
          typeof item.totalPurchased === "number"
            ? item.totalPurchased.toLocaleString("es-AR", {
                maximumFractionDigits: 2,
                style: "currency",
                currency: "ARS",
                useGrouping: true,
              })
            : "",
        totalSold:
          item.totalSold !== undefined && typeof item.totalSold === "number"
            ? item.totalSold.toLocaleString("es-AR", {
                maximumFractionDigits: 2,
                style: "currency",
                currency: "ARS",
                useGrouping: true,
              })
            : "",
        earns:
          item.earns !== undefined && typeof item.earns === "number"
            ? item.earns.toLocaleString("es-AR", {
                maximumFractionDigits: 2,
                style: "currency",
                currency: "ARS",
                useGrouping: true,
              })
            : "",
      })),
    [reportProducs]
  )

  return rows
}
