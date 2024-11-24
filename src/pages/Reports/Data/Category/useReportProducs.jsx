import { DataContext } from "../../../../context/DataContext"
import { useContext } from "react"
import { useMemo } from "react"

export default function useReportProducs() {
  const { purchases, orderDetails, products } = useContext(DataContext)

  const reportProducs = useMemo(() => {
    const result = products.reduce((acc, product) => {
      const purchaseDetails = purchases.filter(
        (purchase) => purchase.products?.id === product.id
      )
      const totalPurchaseQuantity = purchaseDetails.reduce(
        (sum, purchase) => sum + purchase.quantity,
        0
      )
      const totalPurchaseCost = purchaseDetails.reduce(
        (sum, purchase) => sum + purchase.quantity * purchase.uni_cost,
        0
      )

      const orderDetail = orderDetails.filter(
        (purchase) => purchase.products?.id === product.id
      )
      const totalorderDetailsQuantity = orderDetail.reduce(
        (sum, purchase) => sum + purchase.quantity,
        0
      )
      const totalorderDetailsCost = orderDetail.reduce(
        (sum, purchase) => sum + purchase.quantity * purchase.unit_price,
        0
      )

      const categoryKey = ` ${product.sub_type} ${product.model} ${
        product.brand
      } ${product.color || ""}`
      const category = acc.find(
        (category) => category.categoryKey === categoryKey
      )
      if (!category) {
        acc.push({
          type: product.type,
          subType: product.sub_type,
          model: product.model,
          brand: product.brand,
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
      acc[index].purchased += totalPurchaseQuantity
      acc[index].totalPurchased += totalPurchaseCost
      acc[index].sold += totalorderDetailsQuantity
      acc[index].totalSold += totalorderDetailsCost
      acc[index].stock = acc[index].purchased - acc[index].sold
      acc[index].earns = acc[index].totalSold - acc[index].totalPurchased

      return acc
    }, [])

    return result
  }, [purchases, orderDetails, products])

  return reportProducs
}
