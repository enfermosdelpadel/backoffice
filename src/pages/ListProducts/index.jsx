import Layout from "../../Components/Layout"

import useRowsStock from "../../hooks/Stock/useRowsStock"
import useColumnsStock from "../../hooks/Stock/useColumnsStock"

import { Table } from "../../Components/Table"

function ListProducts() {
  return (
    <Layout>
      <Table columns={useColumnsStock()} data={useRowsStock()} name="Stock" />
    </Layout>
  )
}

export { ListProducts }
