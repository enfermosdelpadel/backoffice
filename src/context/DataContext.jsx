import PropTypes from "prop-types"
import { createContext, useState, useEffect } from "react"
import { supabase } from "../supabase/client"

export const DataContext = createContext()

export const DataContextProvider = ({ children }) => {
  const [profile, setProfile] = useState([])
  const [user, setUser] = useState([null]) // Initialize user as null
  const [products, setProducts] = useState([""])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const openForm = () => setIsFormOpen(true)
  const closeForm = () => setIsFormOpen(false)

  const [selectedItem, setSelectedItem] = useState({})

  const [addProduct, setAddProduct] = useState({
    type: "",
    subType: "",
    brand: "",
    color: "",
    gender: "",
    size: "",
    cost: "",
    price: "",
    desc: "",
    stock: "",
    fileUrl: "",
  })

  const insertProduct = async (addProduct) => {
    try {
      const { data } = await supabase.from("products").insert({
        type: addProduct.type,
        subType: addProduct.subType,
        brand: addProduct.brand,
        color: addProduct.color,
        gender: addProduct.gender,
        size: addProduct.size,
        cost: addProduct.cost,
        price: addProduct.price,
        desc: addProduct.desc,
        stock: addProduct.stock,
        fileUrl: addProduct.fileUrl,
      })
      console.log(data)
      alert("Producto Guardado con éxito")
    } catch (error) {
      alert(error.error_description || error.message)
    }
  }

  const editProduct = async (selectedItem) => {
    try {
      console.log(selectedItem.id)
      const { data } = await supabase
        .from("products")
        .update({
          type: selectedItem.type,
          subType: selectedItem.subType,
          brand: selectedItem.brand,
          color: selectedItem.color,
          gender: selectedItem.gender,
          size: selectedItem.size,
          cost: selectedItem.cost,
          price: selectedItem.price,
          desc: selectedItem.desc,
          stock: selectedItem.stock,
          fileUrl: selectedItem.fileUrl,
        })
        .eq("id", selectedItem.id)
      console.log(data)
      alert("Producto Actualizado con éxito")
      closeForm()
    } catch (error) {
      alert(error.error_description || error.message)
    }
  }

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
    <DataContext.Provider
      value={{
        user,
        profile,
        products,
        deleteProduct,
        isFormOpen,
        openForm,
        closeForm,
        insertProduct,
        setProducts,
        addProduct,
        setAddProduct,
        editProduct,
        setSelectedItem,
        selectedItem,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

DataContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
