import Layout from "./pages/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { About, Cart, CheckOut, Contact, Details, FilterCategory, Home, Login, MyAccount, Product, SignUp, Wishlist, Notfound404 } from "./router/router";
import { Suspense } from "react";
import { Toaster } from "./components/ui/sonner";
import ProtectedRoute from "./components/shared/ProtectecRoute";


const App = () => {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Home />
            </Suspense>
          )
        },
        {
          path: "/signup",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <SignUp />
            </Suspense>
          )
        },
        {
          path: "/login",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Login />
            </Suspense>
          )
        },
        {
          path: "/about",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <About />
            </Suspense>
          )
        },
        {
          path: "/contact",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Contact />
            </Suspense>
          )
        },
        {
          path: "/filtercategory",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <FilterCategory />
            </Suspense>
          )
        },
        {
          path: "/filtercategory/:categoryId/:subCategoryId?",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <FilterCategory />
            </Suspense>
          )
        },
        {
          path: "/product",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Product />
            </Suspense>
          )
        },
        {
          path: "/details/:productid",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Details />
            </Suspense>
          )
        },
        {
          path: "/cart",
          element: (
            <ProtectedRoute>
              <Suspense fallback={<div>Loading...</div>}>
                <Cart />
              </Suspense>
            </ProtectedRoute>
          )
        },
        {
          path: "/checkout",
          element: (
            <ProtectedRoute>
              <Suspense fallback={<div>Loading...</div>}>
                <CheckOut />
              </Suspense>
            </ProtectedRoute>
          )
        },
        {
          path: "/wishlist",
          element: (
            <ProtectedRoute>
              <Suspense fallback={<div>Loading...</div>}>
                <Wishlist />
              </Suspense>
            </ProtectedRoute>
          )
        },
        {
          path: "/myaccount",
          element: (
            <ProtectedRoute>
              <Suspense fallback={<div>Loading...</div>}>
                <MyAccount />
              </Suspense>
            </ProtectedRoute>
          )
        },
        {
          path: "*",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Notfound404 />
            </Suspense>
          )
        },
      ],
    },
  ]);
  return (
    <>
      <Toaster />
      <RouterProvider router={route} />
    </>
  );
}

export default App
