import Layout from "../../Components/Layout"

import { Table } from "../../Components/Table"
import useRowsCustomers from "../../hooks/Customers/useRowsCustomers"
import useColumnsCustomers from "../../hooks/Customers/useColumnsCustomers"

function Customers() {
  return (
    <Layout>
      <Table
        name="clientes"
        columns={useColumnsCustomers()}
        data={useRowsCustomers()}
      />
    </Layout>
  )
}

export { Customers }
