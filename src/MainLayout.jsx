import { Outlet } from "react-router-dom"
import { Toaster } from "react-hot-toast"

const MainLayout = () => {
  return (
    <main>
      <Toaster position='top-center' reverseOrder={false} />
      <Outlet />
    </main>
  )
}

export default MainLayout
