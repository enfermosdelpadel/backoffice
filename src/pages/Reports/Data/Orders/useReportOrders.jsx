import { DataContext } from "../../../../context/DataContext"
import { useContext } from "react"
import { useMemo } from "react"

export default function useReportOrders() {
  const { orders, orderDetails, products, profile } = useContext(DataContext)

  const reportOrders = useMemo(() => {
    return orderDetails.reduce((acc, detail) => {
      const order = orders.find((order) => order.id === detail.order_id)
      const product = products?.find(
        (product) => product.id === detail.product_id
      )
      const client = profile?.find((client) => client.id === order?.profile_id)

      if (order && product && client) {
        acc.push({
          orderId: order.id,
          orderNumber: order.order_number,
          date: order.order_date,
          type: product.type,
          customer: client.first_name + " " + client.last_name,
          product:
            product.sub_type +
            " " +
            product.brand +
            " " +
            product.model +
            (product.color ? " " + product.color : ""),
          quantity: detail.quantity,
          value: detail.unit_price,
        })
      }

      return acc
    }, [])
  }, [orders, orderDetails, products, profile])
  return reportOrders
}
