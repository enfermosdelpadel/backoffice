import { useContext } from "react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { DataContext } from "../../context/DataContext"
const FormProducts = () => {
  const context = useContext(DataContext)
  const image =
    "https://cniymayhyvbjdmrlopea.supabase.co/storage/v1/object/public/images/public/1724535488688.png"
  return (
    <div
      className={`${
        context.isFormOpen ? "flex" : "hidden"
      } fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm  justify-center items-center`}
    >
      <div className="rounded-lg bg-gray-100 p-8 shadow-lg flex flex-col">
        <XMarkIcon
          onClick={() => context.closeForm()}
          className="h-6 w-6 text-black cursor-pointer place-self-end"
        ></XMarkIcon>
        <form action="#" className=" mt-8 grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
            <label className="label">Tipo</label>

            <input
              type="text"
              id="type"
              name="type"
              className="input-primary"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label className="label">Sub Tipo</label>

            <input
              type="text"
              id="subType"
              name="subType"
              className="input-primary"
            />
          </div>

          <div className="col-span-6 sm:col-span-3 ">
            <label className="label">Marca</label>

            <input
              type="text"
              id="brand"
              name="brand"
              className="input-primary"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label className="label">Color</label>

            <input
              type="text"
              id="color"
              name="color"
              className="input-primary"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label className="label">Genero</label>

            <input
              type="text"
              id="gender"
              name="gender"
              className="input-primary"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label className="label">Talle</label>

            <input
              type="text"
              id="size"
              name="size"
              className="input-primary"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label className="label">Costo</label>

            <input
              type="text"
              id="cost"
              name="cost"
              className="input-primary"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label className="label">Precio Venta</label>

            <input
              type="text"
              id="price"
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
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label className="label">Imagen</label>

            <input type="file" id="fileUrl" name="image" className="" />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <figure className="w-40 h-40 rounded-lg">
              <img
                className="w-full h-full rounded-lg object-cover"
                src={image}
                alt=""
              />
            </figure>
          </div>
          <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
            <button className="btn-primary">Actualizar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormProducts
