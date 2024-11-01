import Header from "./components/Header/Header"
import DataProvider from "./context/DataProvider"
import Home from "./components/Home/Home"
import {Box} from '@mui/material';
function App() {

  return (

     <>
      <DataProvider>
      <Header/>
      </DataProvider>
      <Box style={{marginTop : 54}}>
      <Home/>
      </Box>
    </>
  )
}

export default App
