import { useRef, useState, useEffect } from "react"
import { PhotoIcon } from "@heroicons/react/16/solid"
import PropTypes from "prop-types"

const ImageProduct = ({ register, uploadImage }) => {
  const hiddenInputRef = useRef()

  const [preview, setPreview] = useState("")

  const handleUploadedFile = (e) => {
    const file = e.target.files[0]
    const previewUrl = URL.createObjectURL(file)
    setPreview(previewUrl)
    register("imageUrl", { value: previewUrl })
    uploadImage(e)
  }

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview)
      }
    }
  }, [preview])

  const onUpload = () => {
    hiddenInputRef.current.click()
  }

  return (
    <div className="flex flex-row items-center gap-5 pt-2">
      <input
        type="file"
        name="imageUrl"
        onChange={handleUploadedFile}
        ref={hiddenInputRef}
        className="hidden"
      />

      <img
        src={preview ? preview : "image-x.svg"}
        alt="product image"
        className="w-36 h-36 object-cover"
      />

      <button
        type="button"
        onClick={onUpload}
        className="mt-2 px-4 py-2 text-sm font-medium flex items-center text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <PhotoIcon className="w-5 h-5 mr-2" aria-hidden="true" />
        Cargar imagen
      </button>
    </div>
  )
}

export { ImageProduct }

ImageProduct.propTypes = {
  register: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
}
