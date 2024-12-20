import { BrowserRouter, useRoutes, useNavigate } from "react-router-dom"
import { useEffect, useContext } from "react"
import { supabase } from "../../supabase/client"
import Menu from "../../Components/Menu"
import { Home } from "../home"
import Login from "../Login"
import NotFound from "../NotFound"
import { Products } from "../Products"
import { ListProducts } from "../ListProducts"
import { Categories } from "../Categories"
import Users from "../Users"
import { Supliers } from "../Suppliers"
import { Purchases } from "../Purchases"
import { Orders } from "../Orders"
import { Customers } from "../Customers"
import { DataContextProvider } from "../../context/DataContext"
import { DataContext } from "../../context/DataContext"
import { Prices } from "../Prices"
import { Attributes } from "../Attributes"
import { Reports } from "../Reports/Index"
import "./App.css"

function AppRoutes() {
  const navigate = useNavigate()
  const context = useContext(DataContext)

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/login")
        context.closeMenu()
      } else {
        context.openMenu()
      }
    })
  }, [navigate, context])

  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/*", element: <NotFound /> },
    { path: "/products", element: <Products /> },
    { path: "/listproducts", element: <ListProducts /> },
    { path: "/Orders", element: <Orders /> },
    { path: "/customers", element: <Customers /> },
    { path: "/users", element: <Users /> },
    { path: "/categories", element: <Categories /> },
    { path: "/suppliers", element: <Supliers /> },
    { path: "/purchases", element: <Purchases /> },
    { path: "/prices", element: <Prices /> },
    { path: "/attributes", element: <Attributes /> },
    { path: "/reports", element: <Reports /> },
  ])
  return routes
}

function App() {
  return (
    <DataContextProvider>
      <BrowserRouter>
        <AppRoutes />
        <Menu />
      </BrowserRouter>
    </DataContextProvider>
  )
}

export default App
