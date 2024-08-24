import { BrowserRouter, useRoutes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "../../supabase/client";
import Home from "../home";
import Login from "../Login";
import NotFound from "../NotFound";
import Products from "../Products";
import Listproducts from "../ListProducts";
import Users from "../Users";
import { DataContextProvider } from "../../context/DataContext";
import "./App.css";

function AppRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/login");
        console.log("User is not logged in");
      }
    });
  }, [navigate]);

  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/*", element: <NotFound /> },
    { path: "/products", element: <Products /> },
    { path: "/listproducts", element: <Listproducts /> },
    { path: "/users", element: <Users /> },
  ]);
  return routes;
}

function App() {
  return (
    <DataContextProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </DataContextProvider>
  );
}

export default App;
