import PropTypes from "prop-types"
import { createContext, useState, useEffect } from "react"
import { supabase } from "../supabase/client"

export const DataContext = createContext()

export const DataContextProvider = ({ children }) => {
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

  //Customers
  const [customers, setCustomers] = useState([""])

  //Sales
  const [sales, setSales] = useState([""])

  const [loading, setLoading] = useState(false)

  const [imageUrl, setImageUrl] = useState("")

  const [selectedItem, setSelectedItem] = useState({
    id: "",
    type: "",
    sub_type: "",
    model: "",
    brand: "",
    color: "",
    gender: "",
    size: "",
    cost: "",
    price: "",
    desc: "",
    stock: "",
    image_url: "",
  })

  const [addProduct, setAddProduct] = useState({})

  // URL for add and update images
  const bucket = import.meta.env.VITE_BUKCKET_NAME

  const uploadImage = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    const fileName = `${Date.now()}-${file.name}`
    const { data, error: uploadError } = await supabase.storage
      .from("images")
      .upload(`public/${fileName}`, file, {
        upsert: false,
      })
    if (uploadError) {
      console.error("Error uploading image:", uploadError)
      alert("Error al subir imagen")
    } else if (data) {
      console.log("Image uploaded:", data)
      setImageUrl({
        image_url: `${bucket}${data.path}`,
      })
      console.log("Image uploaded:", imageUrl.image_url)
    } else {
      console.error("Error uploading image:", data)
    }
  }
  const insertProduct = async (addProduct) => {
    try {
      const { data } = await supabase.from("products").insert({
        type: addProduct.type,
        sub_type: addProduct.sub_type,
        model: addProduct.model,
        brand: addProduct.brand,
        color: addProduct.color,
        gender: addProduct.gender,
        size: addProduct.size,
        cost: addProduct.cost,
        price: addProduct.price,
        desc: addProduct.desc,
        stock: addProduct.stock,
        image_url: addProduct.image_url,
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
      image_url: `${bucket}${data.path}`,
    })
  }
  const editProduct = async (selectedItem) => {
    try {
      console.log(selectedItem.id)
      const { data } = await supabase
        .from("products")
        .update({
          type: selectedItem.type,
          sub_type: selectedItem.sub_type,
          model: selectedItem.model,
          brand: selectedItem.brand,
          color: selectedItem.color,
          gender: selectedItem.gender,
          size: selectedItem.size,
          cost: selectedItem.cost,
          price: selectedItem.price,
          desc: selectedItem.desc,
          stock: selectedItem.stock,
          image_url: selectedItem.image_url,
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

  useEffect(() => {
    const fetchType = async () => {
      const { data, error } = await supabase.from("types").select("*")
      if (error) {
        throw error
      } else {
        setTypes(data)
      }
    }
    fetchType()
  }, [])

  useEffect(() => {
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
    alert("Compra guardada con éxito")
  }

  const fetchPurchases = async () => {
    const { data, error } = await supabase
      .from("purchases")
      .select("*,suppliers(*),products(*),colors(*),sizes(*),genders(*)")
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

  // const fetchCustomers = async () => {
  //   const { data, error } = await supabase.from("customers").select("*")
  //   if (error) {
  //     throw error
  //   }
  //   setCustomers(data)
  // }

  // useEffect(() => {
  //   fetchCustomers()
  // }, [])

  const fetchStock = async () => {
    let { data, error } = await supabase.rpc("get_product_stock")

    if (error) {
      throw error
    }
    setStock(data)
  }

  useEffect(() => {
    fetchStock()
  }, [])

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
        updateImage,
        brands,
        types,
        sub_types,
        models,
        imageUrl,
        setImageUrl,
        insertSupplier,
        suppliers,
        insertPurchase,
        purchases,
        loading,
        setLoading,
        colors,
        sizes,
        genders,
        customers,
        sales,
        stock,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

DataContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
