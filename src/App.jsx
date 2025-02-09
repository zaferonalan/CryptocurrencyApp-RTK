import { Provider } from "react-redux"
import "./App.css"
import store from './redux/store'
import Navbar from "./components/Navbar/Navbar"
import Home from "./pages/home/Home"
import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import Coin from "./pages/coin/Coin"

const App = () => {

  const Layout = () => {
    return(
      <div className="app">
        <Navbar/>
        <Outlet/>
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {path: "/", element: <Home/>},
        {path: "/coin/:id", element: <Coin/>}
      ]
    }
  ])

  return (
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  )
}

export default App