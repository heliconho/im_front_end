import logo from './logo.svg';
import './App.css';
import {Link} from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import {useStore} from './store/store';
import Inventory from './components/inventory';
import axios from 'axios';
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();
  const {setToken, setLoginStatus,setUserEmail} = useStore();
  const tokenValue = useStore((state) => state.token);
  const loginStatus = useStore((state) => state.loginStatus);
  const userEmail = useStore((state) => state.email);

  async function setLogout() {
    await axios.get('http://localhost:3000/api/auth/logout',{headers: { 'Authorization' : 'Bearer '.concat(tokenValue) }})
    .then(res => {
      setLoginStatus(res.data['login'])
      setToken("")
    })
    .catch(error => {
      console.log(error);
    })
    if(!loginStatus){
      navigate("/")
    }
  }

  return (
    <div className="App">
      <div>
        <h1>{loginStatus ? `Hello ${userEmail}` : "Welcome. This is Home Page"}</h1>
        <div>
          {!loginStatus ?
            <nav style={{ borderBottom: "solid 1px", paddingBottom: "1rem" }}>
              <Link to="/login">login</Link> | {" "}
              <Link to="/register">register</Link> {" "}
            </nav>
            :
            <nav style={{ borderBottom: "solid 1px", paddingBottom: "1rem" }}>
              <Link to="/inventory">inventory list</Link>| {" "}
              <Link to="/inventory/update">Portal</Link>| {" "}
              <button onClick={setLogout} >Log out</button>
            </nav>}
      </div>
    </div>
    <div>
        {loginStatus?<Inventory />:<div></div>}
      </div>
    </div>
  );
}

export default App;
