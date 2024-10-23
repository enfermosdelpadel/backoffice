import Layout from "../../Components/Layout"
import { Table } from "../../Components/Table"

import useRowsOrders from "../../hooks/Orders/useRowsOrders"
import useColumnsOrders from "../../hooks/Orders/useColumnsOrders"

function Orders() {
  return (
    <Layout>
      <Table
        columns={useColumnsOrders()}
        data={useRowsOrders()}
        name="pedidos"
      />
    </Layout>
  )
}

export { Orders }
