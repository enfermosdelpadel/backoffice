import PropTypes from "prop-types"
import { createContext, useState, useEffect } from "react"
import { supabase } from "../supabase/client"
import { toast } from "react-hot-toast"

export const DataContext = createContext()

export const DataContextProvider = ({ children }) => {
  //Modal
  const [modalStatus, setModalStatus] = useState(false)

  const [profile, setProfile] = useState([""])
  const [user, setUser] = useState([null]) // Initialize user as null
  const [products, setProducts] = useState([""])
  const [brands, setBrands] = useState([""])
  const [types, setTypes] = useState([""])
  const [sub_types, setsub_types] = useState([""])
  const [models, setModels] = useState([""])

  //Open and close Modal
  const [isFormOpen, setIsFormOpen] = useState(false)
  const openForm = () => setIsFormOpen(true)
  const closeForm = () => setIsFormOpen(false)

  //Open and close Menu
  const [isUserLogin, setIsUserLogin] = useState(false)
  const openMenu = () => setIsUserLogin(true)
  const closeMenu = () => setIsUserLogin(false)
  //Suppliers
  const [suppliers, setSuppliers] = useState([""])
  const [purchases, setPurchases] = useState([""])
  const [colors, setColors] = useState([""])
  const [genders, setGenders] = useState([""])
  const [sizes, setSizes] = useState([""])

  //Stock
  const [stock, setStock] = useState([""])

  //Orders
  const [orders, setOrders] = useState([""])
  const [orderDetails, setOrderDetails] = useState([""])
  const [orderId, setOrderId] = useState(null)
  const [userEmail, setUserEmail] = useState(null)
  const [orderNumber, setOrderNumber] = useState(null)
  const [clientName, setClientName] = useState(null)

  const [loading, setLoading] = useState(false)

  const [imageUrl, setImageUrl] = useState("")

  //Categories
  const [selectedItem, setSelectedItem] = useState({})
  const [isEditing, setIsEditing] = useState(false)

  const [addProduct, setAddProduct] = useState({})

  // URL for add and update images
  const bucket = import.meta.env.VITE_BUKCKET_NAME
  const uploadImage = async (e) => {
    setLoading(true)
    const file = e.target.files[0]
    const fileName = `${Date.now()}-${file.name}`
    const { data, error: uploadError } = await supabase.storage
      .from("images")
      .upload(`public/${fileName}`, file, {
        upsert: false,
      })
    setLoading(false)
    if (!uploadError) {
      setImageUrl(`${bucket}${data.path}`)
      console.log("image url", imageUrl)
    } else {
      alert(uploadError.message)
    }
  }
  const insertProduct = async (addProduct) => {
    const { error } = await supabase.from("products").insert({
      type: addProduct.type,
      sub_type: addProduct.sub_type,
      model: addProduct.model,
      brand: addProduct.brand,
      color: addProduct.color,
      gender: addProduct.gender,
      description: addProduct.description,
      image_url: addProduct.image_url,
    })
    if (error) {
      alert(error.error_description || error.message)
    } else alert("Producto Guardado con éxito")
  }

  // const updateImage = async (e) => {
  //   const date = Date.now()
  //   const imageFile = e.target.files[0]
  //   const { data } = await supabase.storage
  //     .from("images/")
  //     .upload(`public/${date}.png`, imageFile, {
  //       cacheControl: "3600",
  //       upsert: false,
  //     })
  //   setSelectedItem({
  //     ...selectedItem,
  //     image_url: `${bucket}${data.path}`,
  //   })
  // }
  // const editProduct = async (selectedItem) => {
  //   try {
  //     console.log(selectedItem.id)
  //     const { data } = await supabase
  //       .from("products")
  //       .update({
  //         type: selectedItem.type,
  //         sub_type: selectedItem.sub_type,
  //         model: selectedItem.model,
  //         brand: selectedItem.brand,
  //         color: selectedItem.color,
  //         gender: selectedItem.gender,
  //         desc: selectedItem.desc,
  //         image_url: selectedItem.image_url,
  //       })
  //       .eq("id", selectedItem.id)
  //     console.log(data)
  //     alert("Producto Actualizado con éxito")
  //     closeForm()
  //     setProducts(
  //       products.map((product) =>
  //         product.id === selectedItem.id ? selectedItem : product
  //       )
  //     )
  //   } catch (error) {
  //     alert(error.error_description || error.message)
  //   }
  // }

  // const deleteProduct = async (id) => {
  //   try {
  //     const { error } = await supabase.from("products").delete().eq("id", id)

  //     if (error) {
  //       throw error
  //     }
  //     setProducts(products.filter((product) => product.id !== id))
  //   } catch (error) {
  //     alert(error.error_description || error.message)
  //   }
  // }

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
  }, [])

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

  useEffect(() => {
    const fetchBrands = async () => {
      const { data, error } = await supabase.from("brands").select("*")
      if (error) {
        throw error
      } else {
        setBrands(data)
      }
    }
    fetchBrands()
  }, [])

  const fetchType = async () => {
    const { data, error } = await supabase.from("types").select("*")
    if (error) {
      throw error
    } else {
      setTypes(data)
    }
  }

  useEffect(() => {
    fetchType()
  }, [])

  const fetchsub_type = async () => {
    const { data, error } = await supabase
      .from("sub_types")
      .select("*,types(*)")
    if (error) {
      throw error
    } else {
      setsub_types(data)
    }
  }

  useEffect(() => {
    fetchsub_type()
  }, [])

  useEffect(() => {
    const fetchModel = async () => {
      const { data, error } = await supabase.from("models").select("*")
      if (error) {
        throw error
      } else {
        setModels(data)
      }
    }
    fetchModel()
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

  //Supliers

  const insertSupplier = async (addSuplier) => {
    const { error } = await supabase.from("suppliers").insert({
      company: addSuplier.company,
      name: addSuplier.name,
      email: addSuplier.email,
      phone: addSuplier.phone,
      address: addSuplier.address,
    })
    if (error) {
      console.log(error)
      throw error
    }
    fetchSuppliers()
  }

  useEffect(() => {
    fetchSuppliers()
  }, [])

  const fetchSuppliers = async () => {
    const { data, error } = await supabase.from("suppliers").select("*")
    if (error) {
      throw error
    }
    setSuppliers(data)
  }

  const insertPurchase = async (addPurchase) => {
    setLoading(true)
    const { error } = await supabase.from("purchases").insert({
      supplier_id: addPurchase.supplier,
      product_id: addPurchase.product,
      color_id: (addPurchase.color =
        addPurchase.color === "" ? null : addPurchase.color),
      size_id: (addPurchase.size =
        addPurchase.size === "" ? null : addPurchase.size),
      gender_id: (addPurchase.gender =
        addPurchase.gender === "" ? null : addPurchase.gender),
      quantity: addPurchase.quantity,
      uni_cost: addPurchase.uni_cost,
      total_cost: addPurchase.uni_cost * addPurchase.quantity,
    })
    setLoading(false)
    await fetchPurchases()

    if (error) {
      console.log(error)
      alert("Error al guardar la compra")
      throw error
    }
    toast.success("Compra guardada con éxito")
  }

  const updatePercentage = async (data) => {
    const { error } = await supabase
      .from("types")
      .update({
        adjustment_percentage: data.percentage,
        adjustement_date: new Date().toISOString(),
      })
      .eq("id", data.item)
    fetchType()
    if (error) {
      console.log(error)
      alert("Error al guardar el porcentaje")
      throw error
    }
    alert("Porcentaje guardado con éxito")
  }

  const fetchPurchases = async () => {
    const { data, error } = await supabase
      .from("purchases")
      .select("*,suppliers(*),products(*),sizes(*)")
    if (error) {
      throw error
    }
    setPurchases(data)
  }

  useEffect(() => {
    fetchPurchases()
  }, [])

  const fetchColors = async () => {
    const { data, error } = await supabase.from("colors").select("*")
    if (error) {
      throw error
    }
    setColors(data)
  }

  useEffect(() => {
    fetchColors()
  }, [])

  const fetchSizes = async () => {
    const { data, error } = await supabase.from("sizes").select("*")
    if (error) {
      throw error
    }
    setSizes(data)
  }

  useEffect(() => {
    fetchSizes()
  }, [])

  const fetchGenders = async () => {
    const { data, error } = await supabase.from("genders").select("*")
    if (error) {
      throw error
    }
    setGenders(data)
  }

  useEffect(() => {
    fetchGenders()
  }, [])
  const fetchStock = async () => {
    let { data, error } = await supabase.rpc("get_product_stock")
    // console.log(data)
    if (error) {
      throw error
    }
    setStock(data)
  }

  useEffect(() => {
    fetchStock()
  }, [])

  //  Sales

  const fetchSales = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select("*,profiles(*)")
      .order("order_date", { ascending: false })
    if (error) {
      throw error
    }
    setOrders(data)
  }

  useEffect(() => {
    fetchSales()
  }, [])

  const fetchOrderDetails = async () => {
    const { data, error } = await supabase
      .from("order_details")
      .select("*, products(*)")
    if (error) {
      throw error
    }
    setOrderDetails(data)
  }

  useEffect(() => {
    fetchOrderDetails()
  }, [])

  const changeStatus = async (id, status) => {
    const { error } = await supabase
      .from("orders")
      .update({ status: status })
      .eq("id", id)
    if (error) {
      throw error
    }
    setModalStatus(false)
    fetchSales()
  }

  const sendEmail = async (data) => {
    const response = await fetch(
      "https://fastapi-resend.onrender.com/send_mail",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }
  }

  return (
    <DataContext.Provider
      value={{
        user,
        profile,
        products,
        isFormOpen,
        openForm,
        closeForm,
        insertProduct,
        setProducts,
        addProduct,
        setAddProduct,
        setSelectedItem,
        selectedItem,
        openMenu,
        closeMenu,
        isUserLogin,
        logout,
        uploadImage,
        // editProduct,
        // deleteProduct,
        // updateImage,
        brands,
        types,
        sub_types,
        models,
        imageUrl,
        setImageUrl,
        insertSupplier,
        suppliers,
        insertPurchase,
        updatePercentage,
        purchases,
        loading,
        setLoading,
        colors,
        sizes,
        genders,
        orders,
        orderDetails,
        stock,
        orderId,
        setOrderId,
        modalStatus,
        setModalStatus,
        changeStatus,
        sendEmail,
        userEmail,
        setUserEmail,
        isEditing,
        setIsEditing,
        toast,
        orderNumber,
        setOrderNumber,
        clientName,
        setClientName,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

DataContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
