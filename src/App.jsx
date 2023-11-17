import { Route, Routes } from "react-router-dom"
import DefaultLayout from "./Layout/DefaultLayout/DefaultLayout"
import Main from "./pages/Main/Main"

function App() {
  return (
    <>
    <div className="App">
      <Routes>
        <Route path="/" element={<DefaultLayout/>}>
          <Route index element={<Main />} />
        </Route>
      </Routes>
    </div>
    </>
  )
}

export default App
