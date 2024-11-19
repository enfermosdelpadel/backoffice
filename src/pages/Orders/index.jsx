import Layout from "../../Components/Layout"
import { Table } from "../../Components/Table"
import { DataContext } from "../../context/DataContext"
import { useContext } from "react"
import useRowsOrders from "../../hooks/Orders/useRowsOrders"
import useColumnsOrders from "../../hooks/Orders/useColumnsOrders"
import OrderDetails from "../../Components/OrderDetail"
import ReactModal from "react-modal"
import { StatusModal } from "../../Components/StatusModal"

function Orders() {
  const {
    orderId,
    setModalStatus,
    modalStatus,
    changeStatus,
    sendEmail,
    userEmail,
  } = useContext(DataContext)

  return (
    <Layout>
      <ReactModal className="modal" isOpen={modalStatus}>
        <StatusModal
          setModalStatus={setModalStatus}
          orderId={orderId}
          changeStatus={changeStatus}
          sendEmail={sendEmail}
          userEmail={userEmail}
        />
      </ReactModal>
      <Table
        columns={useColumnsOrders()}
        data={useRowsOrders()}
        name="pedidos"
      />
      <OrderDetails orderId={orderId} />
    </Layout>
  )
}

export { Orders }
