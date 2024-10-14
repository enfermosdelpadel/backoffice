import { useState } from "react"
import {
  ChevronDownIcon,
  TrashIcon,
  PencilSquareIcon,
  DocumentTextIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline"

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative">
      <div className="inline-flex items-center overflow-hidden rounded-md ">
        <button
          className="inline-flex p-0"
          aria-expanded={isOpen}
          onClick={handleClick}
        >
          <span className="sr-only">Menu</span>
          <ChevronDownIcon className="h-5 w-5" />
        </button>
      </div>

      <div
        className="absolute end-0 z-10 mt-2 w-56 border border-gray-100 bg-white "
        role="menu"
        aria-labelledby="dropdown-toggle"
        style={{ display: isOpen ? "block" : "none" }}
      >
        <div className="p-2">
          <a
            href="#"
            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            role="menuitem"
          >
            <DocumentTextIcon className="h-5 w-5" />
            Detalle del producto
          </a>

          <a
            href="#"
            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            role="menuitem"
          >
            <PencilSquareIcon className="h-5 w-5" />
            Editar Producto
          </a>

          <a
            href="#"
            className="flex w-full items-center gap-2  px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            role="menuitem"
          >
            <NoSymbolIcon className="h-5 w-5" />
            Suspender Producto
          </a>

          <form method="POST" action="#">
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 text-sm text-red-700 hover:bg-red-50"
              role="menuitem"
            >
              <TrashIcon className="h-5 w-5" />
              Borrar Producto
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export { Dropdown }
