import { Provider } from "react-redux"
import  store  from "../src/redux/store"
import { ThemeProvider } from "./context/ThemeContext"
import AppRouter from "./routes/AppRouter"
import "./App.css"
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
      <Toaster position="top-right" reverseOrder={false} />
        <AppRouter />
      </ThemeProvider>
    </Provider>
  )
}

export default App
