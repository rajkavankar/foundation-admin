import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logout } from "@/features/users/userSlice"

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    if (window.confirm("Are you sure")) {
      dispatch(logout())
      navigate("/")
    }
  }

  return (
    <div className='w-full bg-slate-50'>
      <div className='mx-auto flex max-w-7xl items-center justify-end px-4 py-2 sm:px-6 lg:px-8 shadow-lg '>
        <div className='ml-2 mt-2 block'>
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger className='bg-slate-50'>
                <span className=' inline-block cursor-pointer'>
                  <img
                    className='h-10 w-10 rounded-full'
                    src={userInfo.user?.pic}
                    alt={userInfo.user.name}
                  />
                </span>
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem
                  onClick={handleLogout}
                  className='cursor-pointer'
                  inset>
                  Logout
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>
    </div>
  )
}

export default Navbar
