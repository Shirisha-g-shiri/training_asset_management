import { Route, Routes } from "react-router-dom";
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";
import Welcome from "./components/Welcome";
import List from "./components/List";

const App = () =>{
  return(
    <div>
      
      <Routes>
        <Route path="/" element={<Welcome/>}></Route>
        <Route path="/user" element={<UserList/>}></Route>
        <Route path="/add-user" element={<AddUser/>}></Route>
        <Route path="/list" element={<List/>}></Route>
      </Routes>
    </div>
  )
}

export default App;