import { ArchiveBoxIcon } from "@heroicons/react/24/outline";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { UsersIcon } from "@heroicons/react/24/outline";
function Menu() {
  return (
    <div className="flex h-screen w-32 flex-col justify-between border-e bg-white">
      <div>
        <div className="inline-flex size-16 items-center justify-center">
          <span className="grid size-10 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
            L
          </span>
        </div>

        <div className="border-t border-gray-100">
          <div className="px-2 py-4">
            <a
              href="/products"
              className="t group relative flex justify-center rounded bg-blue-50 px-2 py-1.5"
            >
              <ArchiveBoxIcon className="size-5" />

              <p className="ml-2 font-medium">Alta</p>
            </a>

            <ul>
              <li>
                <a
                  href="/listproducts"
                  className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                >
                  <div className="flex">
                    <ArchiveBoxIcon className="size-5" />
                    <p className="ml-2 font-medium">Listado</p>
                  </div>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                >
                  <div className="flex">
                    <ShoppingBagIcon className="flex justify-end size-5" />
                    <p className="ml-2 font-medium">Ventas</p>
                  </div>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                >
                  <div className="flex">
                    <UsersIcon className="flex justify-start size-5" />
                    <p className="ml-2 font-medium">Usuarios</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2">
        <form action="#">
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
          >
            <ArrowLeftEndOnRectangleIcon className="size-6" />

            <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
              Logout
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Menu;
