import Layout from "../../Components/Layout"
import { Table } from "../../Components/Table"
import { DataContext } from "../../context/DataContext"
import { useContext } from "react"
import useRowsOrders from "../../hooks/Orders/useRowsOrders"
import useColumnsOrders from "../../hooks/Orders/useColumnsOrders"
import OrderDetails from "../../Components/OrderDetail"

function Orders() {
  const { orderId } = useContext(DataContext)

  return (
    <Layout>
      <Table
        columns={useColumnsOrders()}
        data={useRowsOrders()}
        name="pedidos"
      />
      <OrderDetails orderId={orderId} />
    </Layout>
  )
}

export { Orders }
