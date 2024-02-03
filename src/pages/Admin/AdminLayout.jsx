import AdminSidebar from "@/components/AdminSidebar"
import Navbar from "@/components/Navbar"
import { Outlet } from "react-router-dom"

const AdminLayout = () => {
  return (
    <main>
      <section className='flex'>
        <AdminSidebar />
        <div className='flex-1'>
          <Navbar />
          <div className='bg-slate-100 min-h-screen max-h-full p-10'>
            <Outlet />
          </div>
        </div>
      </section>
    </main>
  )
}

export default AdminLayout
