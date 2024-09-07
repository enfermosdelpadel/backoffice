import PropTypes from "prop-types"
import { createContext, useState, useEffect } from "react"
import { supabase } from "../supabase/client"

export const DataContext = createContext()

export const DataContextProvider = ({ children }) => {
  const [profile, setProfile] = useState([])
  const [user, setUser] = useState([null]) // Initialize user as null
  const [products, setProducts] = useState([""])
  //Open and close Modal
  const [isFormOpen, setIsFormOpen] = useState(false)
  const openForm = () => setIsFormOpen(true)
  const closeForm = () => setIsFormOpen(false)
  //Open and close Menu
  const [isUserLogin, setIsUserLogin] = useState(false)
  const openMenu = () => setIsUserLogin(true)
  const closeMenu = () => setIsUserLogin(false)

  const [preview, setPreview] = useState(null)

  const [selectedItem, setSelectedItem] = useState({
    id: "",
    type: "",
    subType: "",
    model: "",
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

  const [addProduct, setAddProduct] = useState({
    type: "",
    subType: "",
    model: "",
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

  // URL for add and update images
  const bucket = import.meta.env.VITE_BUKCKET_NAME

  const uploadImage = async (e) => {
    const date = Date.now()
    const imageFile = e.target.files[0]
    const { data } = await supabase.storage
      .from("images/")
      .upload(`public/${date}.png`, imageFile, {
        cacheControl: "3600",
        upsert: false,
      })
    setPreview(`${bucket}${data?.path}`)
    if (data) {
      setAddProduct({
        ...addProduct,
        fileUrl: `${bucket}${data.path}`,
      })
    }
  }

  const insertProduct = async (addProduct) => {
    try {
      const { data } = await supabase.from("products").insert({
        type: addProduct.type,
        subType: addProduct.subType,
        model: addProduct.model,
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
      // setProducts([...products, addProduct]) ver porque no funciona
    } catch (error) {
      alert(error.error_description || error.message)
    }
  }

  const updateImage = async (e) => {
    const date = Date.now()
    const imageFile = e.target.files[0]
    const { data } = await supabase.storage
      .from("images/")
      .upload(`public/${date}.png`, imageFile, {
        cacheControl: "3600",
        upsert: false,
      })
    setSelectedItem({
      ...selectedItem,
      fileUrl: `${bucket}${data.path}`,
    })
  }
  const editProduct = async (selectedItem) => {
    try {
      console.log(selectedItem.id)
      const { data } = await supabase
        .from("products")
        .update({
          type: selectedItem.type,
          subType: selectedItem.subType,
          model: selectedItem.model,
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
      setProducts(
        products.map((product) =>
          product.id === selectedItem.id ? selectedItem : product
        )
      )
    } catch (error) {
      alert(error.error_description || error.message)
    }
  }

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

  //Fetch Products, Users, Profiles

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

  const logout = async () => {
    try {
      if (!window.confirm("Está seguro de que desea salir?")) return
      const { error } = await supabase.auth.signOut({ scope: "local" })
      if (error) throw error
    } catch (error) {
      console.log(error)
    }
  }

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
        openMenu,
        closeMenu,
        isUserLogin,
        logout,
        uploadImage,
        preview,
        setPreview,
        updateImage,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

DataContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
