import { useState, useContext } from "react"
import { supabase } from "../../supabase/client"
import Layout from "../../Components/Layout"
import { DataContext } from "../../context/DataContext"

const Products = () => {
  const context = useContext(DataContext)

  const bucket = import.meta.env.VITE_BUKCKET_NAME
  const image = "/image-x.svg"

  const [preview, setPreview] = useState(null)

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
      context.setAddProduct({
        ...context.addProduct,
        fileUrl: `${bucket}${data.path}`,
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (
      context.addProduct.type === "" ||
      context.addProduct.subType === "" ||
      context.addProduct.brand === "" ||
      context.addProduct.color === "" ||
      context.addProduct.cost === "" ||
      context.addProduct.price === "" ||
      context.addProduct.desc === "" ||
      context.addProduct.stock === ""
    ) {
      alert("Por favor complete las casillas necesarias")
      return
    }
    try {
      await context.insertProduct({
        ...context.addProduct,
      })
      context.setAddProduct({
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
      setPreview(null)
    } catch (error) {
      alert(error.error_description || error.message)
    }
  }

  return (
    <Layout>
      <div className="rounded-lg bg-gray-100 p-8 shadow-lg">
        <form onSubmit={handleSubmit} className=" mt-8 grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
            <label className="label">Tipo</label>

            <input
              type="text"
              id="type"
              value={context.addProduct.type}
              onChange={(e) =>
                context.setAddProduct({
                  ...context.addProduct,
                  type: e.target.value,
                })
              }
              name="type"
              className="input-primary"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label className="label">Sub Tipo</label>

            <input
              type="text"
              id="subType"
              value={context.addProduct.subType}
              onChange={(e) =>
                context.setAddProduct({
                  ...context.addProduct,
                  subType: e.target.value,
                })
              }
              name="subType"
              className="input-primary"
            />
          </div>

          <div className="col-span-6 sm:col-span-3 ">
            <label className="label">Marca</label>

            <input
              type="text"
              id="brand"
              value={context.addProduct.brand}
              onChange={(e) =>
                context.setAddProduct({
                  ...context.addProduct,
                  brand: e.target.value,
                })
              }
              name="brand"
              className="input-primary"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label className="label">Color</label>

            <input
              type="text"
              id="color"
              value={context.addProduct.color}
              onChange={(e) =>
                context.setAddProduct({
                  ...context.addProduct,
                  color: e.target.value,
                })
              }
              name="color"
              className="input-primary"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label className="label">Genero</label>

            <input
              type="text"
              id="gender"
              value={context.addProduct.gender}
              onChange={(e) =>
                context.setAddProduct({
                  ...context.addProduct,
                  gender: e.target.value,
                })
              }
              name="gender"
              className="input-primary"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label className="label">Talle</label>

            <input
              type="text"
              id="size"
              value={context.addProduct.size}
              onChange={(e) =>
                context.setAddProduct({
                  ...context.addProduct,
                  size: e.target.value,
                })
              }
              name="size"
              className="input-primary"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label className="label">Costo</label>

            <input
              type="text"
              id="cost"
              value={context.addProduct.cost}
              onChange={(e) =>
                context.setAddProduct({
                  ...context.addProduct,
                  cost: e.target.value,
                })
              }
              name="cost"
              className="input-primary"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label className="label">Precio Venta</label>

            <input
              type="text"
              id="price"
              value={context.addProduct.price}
              onChange={(e) =>
                context.setAddProduct({
                  ...context.addProduct,
                  price: e.target.value,
                })
              }
              name="price"
              className="input-primary"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label className="label">Stock</label>

            <input
              type="text"
              id="stock"
              value={context.addProduct.stock}
              onChange={(e) =>
                context.setAddProduct({
                  ...context.addProduct,
                  stock: e.target.value,
                })
              }
              name="stock"
              className="input-primary"
            />
          </div>
          <div className="col-span-6">
            <label className="label">Descripción</label>
            <textarea
              className="input-primary"
              type="text"
              rows="5"
              id="desc"
              value={context.addProduct.desc}
              onChange={(e) =>
                context.setAddProduct({
                  ...context.addProduct,
                  desc: e.target.value,
                })
              }
              name="desc"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label className="label">Imagen</label>

            <input
              type="file"
              id="fileUrl"
              onChange={uploadImage}
              name="image"
              className="input-primary "
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <figure className="w-40 h-40 rounded-lg">
              <img
                className=" w-full h-full rounded-lg object-center"
                src={preview ? preview : image}
                alt=""
              />
            </figure>
          </div>
          <div className="col-span-6">
            <button className="btn-primary">Guardar</button>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default Products
