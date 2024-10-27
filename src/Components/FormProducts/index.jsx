import PropTypes from "prop-types"
import { useForm } from "react-hook-form"
import { useContext, useState, useMemo, useCallback } from "react"
import { DataContext } from "../../context/DataContext"
import { useDropzone } from "react-dropzone"
import { PhotoIcon, PlusIcon } from "@heroicons/react/16/solid"

const FormProducts = (props) => {
  //upload files
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles[0])
  }, [])
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({ onDrop })

  const { brand, type, sub_type, model } = props
  const { insertProduct, uploadImage, imageUrl } = useContext(DataContext)
  const [selectedType, setSelectedType] = useState(null)

  const handleTypeChange = (e) => {
    const selectedTypeValue = e.target.value
    setSelectedType(selectedTypeValue)
  }

  const filteredsub_types = useMemo(
    () =>
      selectedType
        ? sub_type.filter((sub_type) => sub_type.types?.name === selectedType)
        : [],
    [selectedType, sub_type]
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
    // watch,
    reset,
  } = useForm()

  const onSubmit = handleSubmit(async (data) => {
    const file = acceptedFiles[0]
    await uploadImage({ target: { files: [file] } })
    data.fileUrl = imageUrl.fileUrl
    insertProduct(data)
    // console.log(data)

    reset()
  })

  return (
    <>
      <div className="w-full mt-4 bg-white ">
        <div className="flex items-stretch px-3 pt-3 pb-2 bg-gray-300">
          <PlusIcon className="h-6 w-6 mr-2 text-blue-900" />
          <h3 className="text-lg font-medium text-blue-900">
            Añadir un producto
          </h3>
        </div>
        <form onSubmit={onSubmit} className="flex flex-col w-full h-full p-4">
          <div className="mb-4 border border-gray-300 rounded-md p-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="grid grid-cols-1 gap-0 ">
                <div>
                  <label htmlFor="type" className="label-form">
                    Tipo
                  </label>
                  <select
                    id="type"
                    className="w-full"
                    {...register("type", { required: "select one option" })}
                    onChange={handleTypeChange}
                  >
                    <option value="" hidden>
                      Seleccione un tipo
                    </option>
                    {type.map((type, index) => (
                      <option key={index} value={type.name}>
                        {type?.name}
                      </option>
                    ))}
                  </select>
                  {errors.type && (
                    <span className="span-error">Este campo es requerido</span>
                  )}
                </div>
                <div>
                  <label htmlFor="sub_type" className="label-form">
                    Subtipo
                  </label>
                  <select
                    id="sub_type"
                    className="w-full"
                    {...register("sub_type", { required: "select one option" })}
                  >
                    <option value="" hidden>
                      Seleccione un subtipo
                    </option>
                    {filteredsub_types?.map((sub_type, id) => (
                      <option key={id} value={sub_type.name}>
                        {sub_type?.name}
                      </option>
                    ))}
                  </select>
                  {errors.sub_type && (
                    <span className="span-error">Este campo es requerido</span>
                  )}
                </div>

                <div>
                  <label htmlFor="brand" className="label-form">
                    Marca
                  </label>
                  <select
                    id="brand"
                    className="w-full"
                    {...register("brand", { required: "select one option" })}
                  >
                    <option value="" hidden>
                      Seleccione una marca
                    </option>
                    {brand.map((brand, index) => (
                      <option key={index} value={brand.name}>
                        {brand?.name}
                      </option>
                    ))}
                  </select>
                  {errors.brand && (
                    <span className="span-error">Este campo es requerido</span>
                  )}
                </div>
                <div>
                  <label htmlFor="model" className="label-form">
                    Modelo
                  </label>
                  <select
                    id="model"
                    className="w-full"
                    {...register("model", { required: "select one option" })}
                  >
                    <option value="" hidden>
                      Seleccione un modelo
                    </option>
                    {model.map((model, index) => (
                      <option key={index} value={model.name}>
                        {model?.name}
                      </option>
                    ))}
                  </select>
                  {errors.model && (
                    <span className="span-error">Este campo es requerido</span>
                  )}
                </div>
              </div>
              <div>
                <div className="col-span-6 ">
                  <label className="label-form" htmlFor="desc">
                    Descripción
                  </label>
                  <textarea
                    id="desc"
                    className="input-primary border-2 border-gray-300"
                    type="text"
                    rows="5"
                    {...register("desc", { required: true })}
                  />
                  {errors.desc && (
                    <span className="span-error">Este campo es requerido</span>
                  )}
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label className="label-form" htmlFor="fileUrl">
                    Imágen del producto
                  </label>
                  <div
                    {...getRootProps()}
                    className="w-full border-2 border-dashed h-40 w-45 flex items-center justify-center rounded-lg border-gray-300 text-gray-600 hover:text-gray-900 hover:border-gray-400 focus:outline-none focus:border-gray-400"
                  >
                    <input type="file" id="fileUrl" {...getInputProps()} />
                    {acceptedFiles[0] ? (
                      <img
                        className="inline-block h-40 w-45 rounded-lg object-cover"
                        src={URL.createObjectURL(acceptedFiles[0])}
                      />
                    ) : (
                      <div className="">
                        <PhotoIcon className="mx-auto h-10 w-10 text-gray-400" />
                        <p className="text-center text-gray-600">
                          Selecciona una imagen
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-start ">
            <button className="btn-primary ">Añadir Producto</button>
          </div>
          {/* <pre>
        <code>{JSON.stringify(watch(), null, 2)}</code>
      </pre> */}
        </form>
      </div>
    </>
  )
}
export { FormProducts }

FormProducts.propTypes = {
  type: PropTypes.array.isRequired,
  sub_type: PropTypes.array.isRequired,
  brand: PropTypes.array.isRequired,
  model: PropTypes.array.isRequired,
}
