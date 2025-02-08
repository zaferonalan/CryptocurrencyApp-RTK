import { Provider } from "react-redux"
import "./App.css"
import store from './redux/store'
import Navbar from "./components/Navbar/Navbar"

const App = () => {
  return (
    <Provider store={store}>
      <div className='app'>
        <Navbar/>
      </div>
    </Provider>
  )
}

export default App