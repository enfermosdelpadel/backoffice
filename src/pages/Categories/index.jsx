import Layout from "../../Components/Layout"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import { CategoryForm } from "../../Components/CategoryForm"
import "react-tabs/style/react-tabs.css"

import { useContext } from "react"
import { DataContext } from "../../context/DataContext"

function Categories() {
  const { brands, types, sub_types, models, editCategory } =
    useContext(DataContext)
  return (
    <Layout>
      <Tabs className="w-full pt-5 px-5 bg-white h-full">
        <TabList>
          <Tab>Tipo</Tab>
          <Tab>SubTipo</Tab>
          <Tab>Marca</Tab>
          <Tab>Modelo</Tab>
        </TabList>

        <TabPanel>
          <CategoryForm data={types} id="types" editCategory={editCategory} />
        </TabPanel>
        <TabPanel>
          <CategoryForm
            data={sub_types}
            id="sub_types"
            editCategory={editCategory}
          />
        </TabPanel>
        <TabPanel>
          <CategoryForm data={brands} id="brands" editCategory={editCategory} />
        </TabPanel>
        <TabPanel>
          <CategoryForm data={models} id="brands" editCategory={editCategory} />
        </TabPanel>
      </Tabs>
    </Layout>
  )
}

export { Categories }
