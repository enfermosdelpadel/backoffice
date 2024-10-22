import Layout from "../../Components/Layout"
import { FormProducts } from "../../Components/FormProducts"

import { Table } from "../../Components/Table"
import useRows from "../../hooks/Products/useRowsProdutcs"
import useColumns from "../../hooks/Products/useColumnsProducts"
import { useContext } from "react"
import { DataContext } from "../../context/DataContext"

function Products() {
  const { brands, types, subTypes, models } = useContext(DataContext)
  return (
    <Layout>
      <FormProducts
        brand={brands}
        type={types}
        subType={subTypes}
        model={models}
      />

      <Table columns={useColumns()} data={useRows()} name="productos" />
    </Layout>
  )
}

export { Products }
