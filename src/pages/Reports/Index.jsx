import Layout from "../../Components/Layout"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import { Table } from "../../Components/Table"
import "react-tabs/style/react-tabs.css"
import useRowsCategory from "../Reports/Data/Category/useRowsCategory"
import useColumnsCategory from "../Reports/Data/Category/useColumnsCategory"
import useColumnsOrders from "./Data/Orders/useColumnsReportOrders"
import useRowsOrders from "./Data/Orders/useRowsReportOrders"

function Reports() {
  return (
    <Layout>
      <Tabs className="w-full pt-5 px-5 bg-white h-full">
        <TabList>
          <Tab>Reporte Productos</Tab>
          <Tab>Informe Ventas</Tab>
          <Tab>Reporte...</Tab>
        </TabList>

        <TabPanel>
          <Table
            data={useRowsCategory()}
            columns={useColumnsCategory()}
            name={"Comprados/Vendidos"}
          />
        </TabPanel>
        <TabPanel>
          <Table
            data={useRowsOrders()}
            columns={useColumnsOrders()}
            name={"Total de Órdenes"}
          />
        </TabPanel>
        <TabPanel>{/* <Table /> */}</TabPanel>
      </Tabs>
    </Layout>
  )
}
export { Reports }
