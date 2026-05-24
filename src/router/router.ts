import {lazy} from "react"

export const Home = lazy(() => import("../pages/home/Home"))
export const SignUp = lazy(() => import("../pages/signUp/SignUp"))
export const Login = lazy(() => import("../pages/login/Login"))
export const Product = lazy(() => import("../pages/product/Product"))
export const Details = lazy(() => import("../pages/details/Details"))
export const Cart = lazy(() => import("../pages/cart/Cart"))
export const CheckOut = lazy(() => import("../pages/checkout/Checkout"))
export const About = lazy(() => import("../pages/about/About"))
export const Contact = lazy(() => import("../pages/contact/Contact"))
export const FilterCategory = lazy(() => import("../pages/FilterCategory/Filtercategory"))
export const Wishlist = lazy(() => import("../pages/wishlist/Wishlist"))
export const MyAccount = lazy(() => import("../pages/myaccount/Myaccount"))
export const Notfound404 = lazy(() => import("../pages/404notfound/Notfound404"))

