import { useState } from "react"
import { v4 as uuidv4 } from "uuidv4"
import PropTypes from "prop-types"

// import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline"
const CategoryForm = (props) => {
  const { data, id } = props
  const [categories, setCategories] = useState([...data])
  const [newCategory, setNewCategory] = useState("")
  const [editingCategory, setEditingCategory] = useState(null)

  const handleAddCategory = () => {
    if (newCategory.trim() !== "") {
      const newCategoryData = { id: uuidv4(), name: newCategory }
      setCategories([...categories, newCategoryData])
      setNewCategory("")
    }
  }

  const handleEditCategory = (id) => {
    const categoryToEdit = categories.find((category) => category.id === id)
    setEditingCategory(categoryToEdit)
  }

  const handleSaveEdit = (id, newName) => {
    const updatedCategories = categories?.map((category) => {
      if (category.id === id) {
        return { ...category, name: newName }
      }
      return category
    })
    setCategories(updatedCategories)
    setEditingCategory(null)
  }

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter((category) => category.id !== id))
  }

  return (
    <div className="flex">
      <div className="w-1/2 flex-wrap mr-2">
        {/* <select defaultValue={"DEFAULT"} id="category">
          <option value="DEFAULT" disabled>
            Seleccione un tipo
          </option>
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category?.name}
            </option>
          ))}
        </select> */}
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Nuevo Elemento"
          className="border border-gray-300 p-2 rounded min-w-full"
        />
        <div className="flex">
          <button
            onClick={handleAddCategory}
            className="button min-w-full mt-2"
          >
            Agregar
          </button>
        </div>
      </div>
      <div className="w-1/2 pb-4">
        <table className=" w-full divide-gray-200">
          <thead>
            <tr>
              <th className=" bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500  tracking-wider">
                Nombre
              </th>
              <th className=" bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500  tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((category) => (
              <tr key={`${id}-${category.id}`}>
                <td className="whitespace-nowrap">
                  {editingCategory?.id === category.id ? (
                    <input
                      type="text"
                      value={editingCategory?.name} //ver que pasa acá
                      onChange={(e) =>
                        setEditingCategory({
                          ...editingCategory,
                          name: e.target.value,
                        })
                      }
                      className="border border-gray-300 p-2 rounded"
                    />
                  ) : (
                    category.name
                  )}
                </td>
                <td className="  text-right text-sm font-medium">
                  {editingCategory?.id === category.id ? (
                    <button
                      onClick={() =>
                        handleSaveEdit(category.id, editingCategory.name)
                      }
                    >
                      Guardar
                    </button>
                  ) : (
                    <button onClick={() => handleEditCategory(category.id)}>
                      Editar
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="ml-2 text-red-500"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export { CategoryForm }

CategoryForm.propTypes = {
  data: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
}
