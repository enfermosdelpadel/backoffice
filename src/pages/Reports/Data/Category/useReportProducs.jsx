import { DataContext } from "../../../../context/DataContext"
import { useContext } from "react"
import { useMemo } from "react"

export default function useReportProducs() {
  const { purchases, orderDetails } = useContext(DataContext)

  const reportProducs = useMemo(() => {
    const result = purchases.reduce((acc, purchase) => {
      const orderDetail = orderDetails.find(
        (detail) => detail && detail.product_id === purchase.products?.id
      )

      if (orderDetail) {
        const categoryKey = `${purchase.products.type} ${
          purchase.products.sub_type
        } ${purchase.products.model} ${purchase.products.brand} ${
          purchase.products.color || ""
        }`
        const category = acc.find(
          (category) => category.categoryKey === categoryKey
        )
        if (!category) {
          acc.push({
            categoryKey,
            purchased: 0,
            sold: 0,
            stock: 0,
            totalPurchased: 0,
            totalSold: 0,
            earns: 0,
          })
        }
        const index = acc.findIndex(
          (category) => category.categoryKey === categoryKey
        )
        acc[index].purchased += purchase.quantity
        acc[index].totalPurchased += purchase.quantity * purchase.uni_cost
        acc[index].sold += orderDetail.quantity
        acc[index].totalSold += orderDetail.quantity * orderDetail.unit_price
        acc[index].stock = acc[index].purchased - acc[index].sold
        acc[index].earns = acc[index].totalSold - acc[index].totalPurchased
      }

      return acc
    }, [])

    return result
  }, [purchases, orderDetails])
  return reportProducs
}
