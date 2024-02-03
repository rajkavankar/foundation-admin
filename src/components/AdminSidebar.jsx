import { BarChart, BookImage } from "lucide-react"
import { NavLink } from "react-router-dom"

const AdminSidebar = () => {
  const SidebarRoutes = [
    {
      id: 1,
      title: "Dashboard",
      icon: <BarChart />,
      route: "/dashboard",
    },
    {
      id: 2,
      title: "Stories in motion",
      icon: <BookImage />,
      route: "/stories",
    },
  ]
  return (
    <aside className='flex min-h-screen w-64 flex-col overflow-y-auto border-r bg-black px-5 py-8 max-h-full'>
      <a href='#'>
        <img src='./logo.jpg' alt='logo' className='h-8 w-8' />
      </a>
      <div className='mt-6 flex flex-1 flex-col justify-between'>
        <nav className='-mx-3 space-y-6 '>
          <div className='space-y-3 '>
            <label className='px-3 text-xs font-semibold uppercase text-white'>
              analytics
            </label>

            {SidebarRoutes.map((item) => (
              <NavLink
                key={item.id}
                className={({ isActive }) =>
                  isActive
                    ? "flex transform items-center rounded-lg px-3 py-2 text-gray-700 transition-colors duration-300 bg-gray-50 "
                    : "flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-50 hover:text-gray-700"
                }
                to={item.route}>
                {item.icon}
                <span className='mx-2 text-sm font-medium'>{item.title}</span>
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </aside>
  )
}

export default AdminSidebar
