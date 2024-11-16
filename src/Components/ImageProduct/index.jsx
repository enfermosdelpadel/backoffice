import { useRef, useState } from "react"
import { PhotoIcon } from "@heroicons/react/16/solid"
import PropTypes from "prop-types"

const ImageProduct = ({ register, uploadImage, image, isloading }) => {
  const hiddenInputRef = useRef()

  const { ref: registerRef, ...rest } = register("image_url")

  const [preview, setPreview] = useState("")

  const handleUploadedFile = (e) => {
    uploadImage(e)
    setPreview(image)
    console.log("image", image)
    console.log("preview", preview)
  }

  const onUpload = () => {
    hiddenInputRef.current.click()
  }

  const uploadButtonLabel = isloading
    ? "Cargando..."
    : preview
    ? "Cambiar imagen"
    : "Subir imagen"

  return (
    <div className="flex flex-row items-center gap-5 pt-2">
      <input
        type="file"
        name="image_url"
        {...rest}
        onChange={handleUploadedFile}
        ref={(e) => {
          registerRef(e)
          hiddenInputRef.current = e
        }}
        className="hidden"
      />

      <img
        src={preview ? preview : "/public/image-x.svg"}
        alt="product image"
        className="w-32 h-32 object-cover"
      />

      <button
        type="button"
        onClick={onUpload}
        className="mt-2 px-4 py-2 text-sm font-medium flex items-center text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <PhotoIcon className="w-5 h-5 mr-2" aria-hidden="true" />
        {uploadButtonLabel}
      </button>
    </div>
  )
}

export { ImageProduct }

ImageProduct.propTypes = {
  register: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  isloading: PropTypes.bool.isRequired,
}
