import logo from './logo.svg';
import './App.css';
import {Link} from "react-router-dom";
import {useStore} from './store/store';


function App() {
  const tokenValue = useStore((state) => state.token);
  const loginStatus = useStore((state) => state.loginStatus);
  const {setToken, setLoginStatus} = useStore();
  return (
    <div className="App">
      <div>
        <h1>{loginStatus?`Hello ${tokenValue}`:"Welcome. This is Home Page"}</h1>
        <nav
          style={{
            borderBottom: "solid 1px",
            paddingBottom: "1rem"
          }}
        >
          <Link to="/login">login</Link> | {" "}
          <Link to="/register">register</Link>| {" "}
          <Link to="/inventory">inventory list</Link>| {" "}
          <Link to="/inventory/create">create inventory</Link>| {" "}
          <Link to="/inventory/update">update inventory</Link>| {" "}
        </nav>
      </div>
    </div>
  );
}

export default App;
