import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup"
import { axiosRequest } from "../../utils/token"
import { toast } from "sonner"

export default function SignUp() {
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      userName: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Name is required"),
      phoneNumber: Yup.string().required("Phone Number is required"),
      email: Yup.string().required("Email is required"),
      password: Yup.string().required("Password is required"),
      confirmPassword: Yup.string().required("Confirm Password is required").oneOf([Yup.ref("password")], "Passwords must match"),
    }),
    onSubmit: async (values) => {
      try {
        await axiosRequest.post("/api/Account/register", {
          userName: values.userName,
          phoneNumber: values.phoneNumber,
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
        })
        formik.resetForm()
        toast.success("Account created successfully!")
        navigate("/login")
      } catch (error) {
        const message = error.response?.data?.errors?.[0]
        if (message?.includes("saving the entity")) {
          toast.error("Username or email already exists!")
        } else {
          toast.error("Something went wrong. Please try again.")
        }
      }
    },
  })

  return (
    <div className="w-full mt-20 max-w-md mx-auto p-6 md:p-10 space-y-4 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-200">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Create an account</h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400">Enter your details below</p>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="sr-only">Name</Label>
          <Input id="name" type="text" placeholder="Name" {...formik.getFieldProps("userName")} className="w-full px-4 py-6 border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 rounded-lg focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-700 shadow-none" />
          {formik.touched.userName && formik.errors.userName && <p className="text-sm text-red-500 dark:text-red-400">{formik.errors.userName}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phoneNumber" className="sr-only">Phone Number</Label>
          <Input id="phoneNumber" type="text" placeholder="Phone Number" {...formik.getFieldProps("phoneNumber")} className="w-full px-4 py-6 border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 rounded-lg focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-700 shadow-none" />
          {formik.touched.phoneNumber && formik.errors.phoneNumber && <p className="text-sm text-red-500 dark:text-red-400">{formik.errors.phoneNumber}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="sr-only">Email</Label>
          <Input id="email" type="email" placeholder="Email" {...formik.getFieldProps("email")} className="w-full px-4 py-6 border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 rounded-lg focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-700 shadow-none" />
          {formik.touched.email && formik.errors.email && <p className="text-sm text-red-500 dark:text-red-400">{formik.errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="sr-only">Password</Label>
          <Input id="password" type="password" placeholder="Password" {...formik.getFieldProps("password")} className="w-full px-4 py-6 border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 rounded-lg focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-700 shadow-none" />
          {formik.touched.password && formik.errors.password && <p className="text-sm text-red-500 dark:text-red-400">{formik.errors.password}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="sr-only">Confirm Password</Label>
          <Input id="confirmPassword" type="password" placeholder="Confirm Password" {...formik.getFieldProps("confirmPassword")} className="w-full px-4 py-6 border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 rounded-lg focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-700 shadow-none" />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && <p className="text-sm text-red-500 dark:text-red-400">{formik.errors.confirmPassword}</p>}
        </div>

        <Button type="submit" disabled={formik.isSubmitting} className="w-full py-7 text-base font-semibold text-white bg-[#D64344] hover:bg-[#C23C3D] dark:bg-[#D64344] dark:hover:bg-[#C23C3D] rounded-lg shadow-none transition-colors">
          {formik.isSubmitting ? "Creating..." : "Create Account"}
        </Button>
      </form>

      <div className="space-y-3">
        <Button variant="outline" className="w-full py-7 text-base font-medium text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-lg shadow-none hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">
          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Sign up with Google
        </Button>

        <div className="text-center text-base text-zinc-600 dark:text-zinc-400">
          Already have account?{" "}
          <Link to={"/login"} className="font-semibold text-zinc-900 dark:text-zinc-50 underline hover:no-underline">Log in</Link>
        </div>
      </div>
    </div>
  )
}