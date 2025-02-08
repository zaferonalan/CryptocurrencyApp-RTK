import { Provider } from "react-redux"
import "./App.css"
import store from './redux/store'
import Navbar from "./components/Navbar/Navbar"
import Home from "./pages/home/Home"

const App = () => {
  return (
    <Provider store={store}>
      <div className='app'>
        <Navbar/>
        <Home/>
      </div>
    </Provider>
  )
}

export default App