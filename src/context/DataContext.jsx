import PropTypes from "prop-types"
import { createContext, useState, useEffect } from "react"
import { supabase } from "../supabase/client"

export const DataContext = createContext()

export const DataContextProvider = ({ children }) => {
  const [profile, setProfile] = useState([])
  const [user, setUser] = useState([null]) // Initialize user as null
  const [products, setProducts] = useState([""])

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("products").select("*")
      if (error) {
        throw error
      } else {
        setProducts(data)
      }
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }
    fetchUser()
  }, [user])

  useEffect(() => {
    const fetchProfiles = async () => {
      const { data, error } = await supabase.from("profiles").select("*")
      if (error) {
        throw error
      } else {
        setProfile(data)
      }
    }
    fetchProfiles()
  }, [])

  // const createTask = async (taskName) => {
  //   try {
  //     const result = await supabase.from("task").insert({
  //       name: taskName,
  //       userid: user.id,
  //     });
  //     console.log(result);
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  const deleteProduct = async (id) => {
    try {
      const { error } = await supabase.from("products").delete().eq("id", id)

      if (error) {
        throw error
      }
      setProducts(products.filter((product) => product.id !== id))
    } catch (error) {
      alert(error.error_description || error.message)
    }
  }

  // const updateTask = async (id, done) => {
  //   const { error, data } = await supabase
  //     .from("task")
  //     .update({ done: !done })
  //     .eq("userid", user.id)
  //     .eq("id", id);
  //   if (error) throw error;
  //   else {
  //     console.log(data);
  //   }
  // };

  return (
    <DataContext.Provider value={{ user, profile, products, deleteProduct }}>
      {children}
    </DataContext.Provider>
  )
}

DataContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
