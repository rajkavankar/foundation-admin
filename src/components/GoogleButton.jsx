import { GoogleLogin } from "@react-oauth/google"
import { jwtDecode } from "jwt-decode"
import { useDispatch } from "react-redux"
import { setCredentials } from "@/features/users/userSlice"
import { useLoginUserMutation } from "@/features/api/authApi"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const GoogleButton = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loginUser] = useLoginUserMutation()
  return (
    <div>
      <GoogleLogin
        theme='filled_black'
        onSuccess={async (credentialResponse) => {
          console.log("credentialResponse", credentialResponse)
          const decoded = jwtDecode(credentialResponse.credential)
          console.log("Decoded ", decoded)
          const authRes = {
            name: `${decoded.given_name} ${decoded.family_name}`,
            email: decoded.email,
            pic: decoded.picture,
          }
          console.log("Authres" + authRes)
          try {
            const res = await loginUser({ ...authRes }).unwrap()
            console.log("Res" + res)

            dispatch(setCredentials({ user: res.user, token: res.token }))
            navigate("/dashboard")
          } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
          }
        }}
        onError={() => {
          console.log("Login Failed")
        }}
      />
    </div>
  )
}

export default GoogleButton
