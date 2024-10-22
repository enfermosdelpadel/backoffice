import Layout from "../../Components/Layout"

import { Table } from "../../Components/Table"
import useRowsUsers from "../../hooks/Users/useRowsUsers"
import useColumnsUsers from "../../hooks/Users/useColumnsUsers"

function Users() {
  return (
    <Layout>
      <Table
        columns={useColumnsUsers()}
        data={useRowsUsers()}
        name="usuarios del sistema"
      />
    </Layout>
  )
}

export default Users
