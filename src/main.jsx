import React from "react"
import ReactDOM from "react-dom/client"
import MainLayout from "./MainLayout.jsx"
import "./index.css"
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom"
import { store } from "./app/store.jsx"
import { Provider } from "react-redux"
import { GoogleOAuthProvider } from "@react-oauth/google"
import LoginPage from "./pages/Login/LoginPage.jsx"
import AdminLayout from "./pages/Admin/AdminLayout.jsx"
import DashboardPage from "./pages/Admin/dashboard/DashboardPage.jsx"
import StoriesPage from "./pages/Admin/stories/StoriesPage.jsx"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index={true} path='' element={<LoginPage />} />
      <Route element={<AdminLayout />}>
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/stories' element={<StoriesPage />} />
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
)
