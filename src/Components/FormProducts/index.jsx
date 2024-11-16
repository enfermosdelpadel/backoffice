import PropTypes from "prop-types"
import { useForm } from "react-hook-form"
import { useContext, useState, useMemo } from "react"
import { DataContext } from "../../context/DataContext"
import { PlusIcon } from "@heroicons/react/16/solid"
import { ImageProduct } from "../ImageProduct"

const FormProducts = (props) => {
  const { brand, type, sub_type, model, gender, color } = props
  const { insertProduct, uploadImage, imageUrl, loading } =
    useContext(DataContext)
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
  } = useForm({
    defaultValues: {
      imageUrl: undefined,
    },
  })

  const onSubmit = handleSubmit(async (data) => {
    insertProduct(data)
    reset()
  })

  return (
    <>
      <div className="w-full mt-4 bg-white ">
        <div className="flex items-stretch px-3 pt-3 pb-2 bg-gray-300">
          <PlusIcon className="h-6 w-6 mr-2 text-blue-900" />
          <h3 className="h3">Añadir un producto</h3>
        </div>
        <form onSubmit={onSubmit} className="flex flex-col w-full h-full p-4">
          <div className="mb-4 border border-gray-300 rounded-md p-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="grid grid-cols-1 gap-0 ">
                <div>
                  <label htmlFor="type" className="label-form">
                    Tipo (*){" "}
                    {errors.type && (
                      <span className="span-error">
                        Este campo es requerido
                      </span>
                    )}
                  </label>
                  <select
                    id="type"
                    className="w-full"
                    {...register("type", { required: "select one option" })}
                    onChange={handleTypeChange}
                  >
                    <option value="" hidden>
                      Seleccione un tipo {""}
                    </option>
                    {type.map((type, index) => (
                      <option key={index} value={type.name}>
                        {type?.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="sub_type" className="label-form">
                    Subtipo (*){" "}
                    {errors.sub_type && (
                      <span className="span-error">
                        Este campo es requerido
                      </span>
                    )}
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
                </div>

                <div>
                  <label htmlFor="brand" className="label-form">
                    Marca (*){" "}
                    {errors.brand && (
                      <span className="span-error">
                        Este campo es requerido
                      </span>
                    )}
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
                </div>
                <div>
                  <label htmlFor="model" className="label-form">
                    Modelo (*){" "}
                    {errors.model && (
                      <span className="span-error">
                        Este campo es requerido
                      </span>
                    )}
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
                </div>
                <div>
                  <label htmlFor="gender" className="label-form">
                    Género (*){" "}
                    {errors.gender && (
                      <span className="span-error">
                        Este campo es requerido
                      </span>
                    )}
                  </label>
                  <select
                    id="gender"
                    className="w-full"
                    {...register("gender", { required: "select one option" })}
                  >
                    <option value="" hidden>
                      Seleccione un Genero
                    </option>
                    {gender?.map((gender, id) => (
                      <option key={id} value={gender.name}>
                        {gender?.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="color" className="label-form">
                    Color (*){" "}
                    {errors.color && (
                      <span className="span-error">
                        Este campo es requerido
                      </span>
                    )}
                  </label>
                  <select
                    id="color"
                    className="w-full"
                    {...register("color", { required: "select one option" })}
                  >
                    <option value="" hidden>
                      Seleccione un Genero
                    </option>
                    {color?.map((color, id) => (
                      <option key={id} value={color.name}>
                        {color?.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <div className="col-span-6 ">
                  <label className="label-form" htmlFor="description">
                    Descripción (*){" "}
                    {errors.description && (
                      <span className="span-error">
                        Este campo es requerido
                      </span>
                    )}
                  </label>
                  <textarea
                    id="description"
                    className="input-primary border-2 border-gray-300"
                    type="text"
                    rows="5"
                    {...register("description", { required: true })}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label className="label-form" htmlFor="image_url">
                    Imágen del producto
                  </label>
                  <ImageProduct
                    register={register}
                    uploadImage={uploadImage}
                    image={imageUrl}
                    isloading={loading}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-coljustify-start ">
            <button className="btn-primary ">
              {loading ? "Loading..." : "Añadir Producto"}
            </button>
            <span className="pt-2 pl-5">(*) Campos obligatorios</span>
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
  gender: PropTypes.array.isRequired,
  color: PropTypes.array.isRequired,
}
