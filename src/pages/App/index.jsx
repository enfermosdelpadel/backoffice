import { BrowserRouter, useRoutes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "../../supabase/client";
import Home from "../home";
import Login from "../Login";
import NotFound from "../NotFound";
import SignUp from "../SignUp";
import Products from "../Products";
import Listproducts from "../ListProducts";
import { TaskContextProvider } from "../../context/TaskContext";
import "./App.css";

function AppRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/signup");
        console.log("User is not logged in");
      }
    });
  }, [navigate]);

  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/*", element: <NotFound /> },
    { path: "/products", element: <Products /> },
    { path: "/listproducts", element: <Listproducts /> },
  ]);
  return routes;
}

function App() {
  return (
    <TaskContextProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TaskContextProvider>
  );
}

export default App;
