import { useState } from "react"
import { ChevronDownIcon, TrashIcon } from "@heroicons/react/24/outline"

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative">
      <div className="inline-flex items-center overflow-hidden rounded-md ">
        <a className="border-e px-2 py-2 text-sm/none text-gray-600 hover:bg-gray-50 hover:text-gray-700">
          Acciones
        </a>

        <button className="" aria-expanded={isOpen} onClick={handleClick}>
          <span className="sr-only">Menu</span>
          <ChevronDownIcon className="h-5 w-5" />
        </button>
      </div>

      <div
        className="absolute end-0 z-10 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg"
        role="menu"
        aria-labelledby="dropdown-toggle"
        style={{ display: isOpen ? "block" : "none" }}
      >
        <div className="p-2">
          <a
            href="#"
            className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            role="menuitem"
          >
            View on Storefront
          </a>

          <a
            href="#"
            className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            role="menuitem"
          >
            View Warehouse Info
          </a>

          <a
            href="#"
            className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            role="menuitem"
          >
            Duplicate Product
          </a>

          <a
            href="#"
            className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            role="menuitem"
          >
            Unpublish Product
          </a>

          <form method="POST" action="#">
            <button
              type="submit"
              className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
              role="menuitem"
            >
              <TrashIcon className="h-5 w-5" />
              Delete Product
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export { Dropdown }
