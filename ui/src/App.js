import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import Cart from './pages/cart/Cart.jsx'
import Success from './pages/success/Success.jsx'
import Cancel from './pages/cancel/Cancel.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Cart />
  },
  {
    path: '/success',
    element: <Success />
  },
  {
    path: '/cancel',
    element: <Cancel />
  }
])

function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
