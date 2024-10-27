import { useContext } from "react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { DataContext } from "../../context/DataContext"
const FormProducts = () => {
  const context = useContext(DataContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await context.editProduct({
        ...context.selectedItem,
      })
    } catch (error) {
      console.log(error)
    }
  }

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
        <form onSubmit={handleSubmit} className=" mt-8 grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
            <label className="label">Tipo</label>

            <input
              value={context.selectedItem.type}
              onChange={(e) => {
                context.setSelectedItem({
                  ...context.selectedItem,
                  type: e.target.value,
                })
              }}
              type="text"
              id="type"
              className="input-primary"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label className="label">Sub Tipo</label>

            <input
              value={context.selectedItem?.sub_type}
              onChange={(e) => {
                context.setSelectedItem({
                  ...context.selectedItem,
                  sub_type: e.target.value,
                })
              }}
              type="text"
              id="sub_type"
              name="sub_type"
              className="input-primary"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label className="label">Modelo</label>

            <input
              value={context.selectedItem?.model}
              onChange={(e) => {
                context.setSelectedItem({
                  ...context.selectedItem,
                  model: e.target.value,
                })
              }}
              type="text"
              id="model"
              name="model"
              className="input-primary"
            />
          </div>

          <div className="col-span-6 sm:col-span-3 ">
            <label className="label">Marca</label>

            <input
              value={context.selectedItem?.brand}
              onChange={(e) => {
                context.setSelectedItem({
                  ...context.selectedItem,
                  brand: e.target.value,
                })
              }}
              type="text"
              id="brand"
              name="brand"
              className="input-primary"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label className="label">Color</label>

            <input
              value={context.selectedItem?.color}
              onChange={(e) => {
                context.setSelectedItem({
                  ...context.selectedItem,
                  color: e.target.value,
                })
              }}
              type="text"
              id="color"
              name="color"
              className="input-primary"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label className="label">Genero</label>

            <input
              value={context.selectedItem?.gender}
              onChange={(e) => {
                context.setSelectedItem({
                  ...context.selectedItem,
                  gender: e.target.value,
                })
              }}
              type="text"
              id="gender"
              name="gender"
              className="input-primary"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label className="label">Talle</label>

            <input
              value={context.selectedItem?.size}
              onChange={(e) => {
                context.setSelectedItem({
                  ...context.selectedItem,
                  size: e.target.value,
                })
              }}
              type="text"
              id="size"
              name="size"
              className="input-primary"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label className="label">Costo</label>

            <input
              value={context.selectedItem?.cost}
              onChange={(e) => {
                context.setSelectedItem({
                  ...context.selectedItem,
                  cost: e.target.value,
                })
              }}
              type="text"
              id="cost"
              name="cost"
              className="input-primary"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label className="label">Precio Venta</label>

            <input
              value={context.selectedItem?.price}
              onChange={(e) => {
                context.setSelectedItem({
                  ...context.selectedItem,
                  price: e.target.value,
                })
              }}
              type="text"
              id="price"
              name="price"
              className="input-primary"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label className="label">Stock</label>

            <input
              value={context.selectedItem?.stock}
              onChange={(e) => {
                context.setSelectedItem({
                  ...context.selectedItem,
                  stock: e.target.value,
                })
              }}
              type="text"
              id="stock"
              name="stock"
              className="input-primary"
            />
          </div>
          <div className="col-span-6">
            <label className="label">Descripción</label>
            <textarea
              value={context.selectedItem?.desc}
              onChange={(e) => {
                context.setSelectedItem({
                  ...context.selectedItem,
                  desc: e.target.value,
                })
              }}
              className="input-primary"
              type="text"
              rows="5"
              id="desc"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label className="label">Imagen</label>

            <input
              type="file"
              id="fileUrl"
              name="image"
              onChange={context.updateImage}
              className=""
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <figure className="w-40 h-40 rounded-lg">
              <img
                className="w-full h-full rounded-lg object-cover"
                src={context.selectedItem?.fileUrl}
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
