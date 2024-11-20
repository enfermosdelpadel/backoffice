import Layout from "../../Components/Layout"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import { CategoryForm } from "../../Components/CategoryForm"
import "react-tabs/style/react-tabs.css"

import { useContext } from "react"
import { DataContext } from "../../context/DataContext"

function Attributes() {
  const { colors, genders, sizes } = useContext(DataContext)
  return (
    <Layout>
      <Tabs className="w-full pt-5 px-5 bg-white h-full">
        <TabList>
          <Tab>Colores</Tab>
          <Tab>Géneros</Tab>
          <Tab>Tallas</Tab>
        </TabList>

        <TabPanel>
          <CategoryForm data={colors} id="types" />
        </TabPanel>
        <TabPanel>
          <CategoryForm data={genders} id="sub_types" />
        </TabPanel>
        <TabPanel>
          <CategoryForm data={sizes} id="brands" />
        </TabPanel>
      </Tabs>
    </Layout>
  )
}

export { Attributes }
