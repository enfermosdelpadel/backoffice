import Layout from "../../Components/Layout"
import { FormProducts } from "../../Components/FormProducts"
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
    </Layout>
  )
}

export { Products }
