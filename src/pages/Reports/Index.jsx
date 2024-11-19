import Layout from "../../Components/Layout"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import { Table } from "../../Components/Table"
import "react-tabs/style/react-tabs.css"
import useRowsCategory from "../Reports/Data/Category/useRowsCategory"
import useColumnsCategory from "../Reports/Data/Category/useColumnsCategory"

function Reports() {
  return (
    <Layout>
      <Tabs className="w-full pt-5 px-5 bg-white h-full">
        <TabList>
          <Tab>Reporte Productos</Tab>
          <Tab>Informe ...</Tab>
          <Tab>Reporte...</Tab>
        </TabList>

        <TabPanel>
          <Table
            data={useRowsCategory()}
            columns={useColumnsCategory()}
            name={"Comprados/Vendidos"}
          />
        </TabPanel>
        <TabPanel>{/* <Table /> */}</TabPanel>
        <TabPanel>{/* <Table /> */}</TabPanel>
      </Tabs>
    </Layout>
  )
}
export { Reports }
