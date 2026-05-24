import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup"
import { axiosRequest, saveToken } from "../../utils/token"
import { toast } from "sonner"
import { useState } from "react"
import { setCredentials } from "../../reducer/Myaccountslice"
import { useDispatch } from "react-redux"
import { fetchProfile } from "../../api/Myaccountapi"
import { type AppDispatch } from "../../store/store"

export default function Login() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch<AppDispatch>()

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axiosRequest.post("/api/Account/login", {
          userName: values.userName,
          password: values.password,
        })

        const token = res.data.data  

        saveToken(token)

        const payload = JSON.parse(atob(token.split(".")[1]))
        const userId = payload.id  

        localStorage.setItem("userId", userId)

        dispatch(setCredentials({ token, profile: null }))
        dispatch(fetchProfile(userId))

        toast.success("Logged in successfully!")
        navigate("/")
      } catch (error) {
        const message = error.response?.data?.errors?.[0]
        toast.error(message ?? "Invalid username or password.")
      }
    },
  })

  return (
    <div className="w-full mt-20 max-w-md mx-auto px-4 py-12 sm:px-6 md:py-20 flex flex-col justify-center min-h-[80vh] bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-200">
      <div className="mb-10 text-left">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 mb-3">Log in to Exclusive</h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400">Enter your details below</p>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="userName" className="text-zinc-900 dark:text-zinc-200">Username</Label>
          <Input id="userName" type="text" placeholder="username" {...formik.getFieldProps("userName")} className="w-full px-4 py-6 border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 rounded-lg focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-700 shadow-none" />
          {formik.touched.userName && formik.errors.userName && <p className="text-sm text-red-500 dark:text-red-400">{formik.errors.userName}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-zinc-900 dark:text-zinc-200">Password</Label>
          <div className="relative">
            <Input id="password" type={showPassword ? "text" : "password"} placeholder="password" {...formik.getFieldProps("password")} className="w-full px-4 py-6 border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 rounded-lg focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-700 shadow-none pr-12" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {formik.touched.password && formik.errors.password && <p className="text-sm text-red-500 dark:text-red-400">{formik.errors.password}</p>}
        </div>

        <div className="text-right">
          <Link to="/forgot-password" className="text-sm text-[#DB4444] dark:text-[#E05353] hover:underline">Forget Password?</Link>
        </div>

        <Button type="submit" disabled={formik.isSubmitting} className="w-full py-6 text-base font-medium text-white bg-[#DB4444] hover:bg-[#E05353] dark:bg-[#DB4444] dark:hover:bg-[#E05353] rounded-lg shadow-none transition-colors">
          {formik.isSubmitting ? "Logging in..." : "Log In"}
        </Button>

        <div className="text-center text-base text-zinc-600 dark:text-zinc-400">
          Don't have an account?{" "}
          <Link to="/signup" className="font-semibold text-zinc-900 dark:text-zinc-50 underline hover:no-underline">Sign up</Link>
        </div>
      </form>
    </div>
  )
}