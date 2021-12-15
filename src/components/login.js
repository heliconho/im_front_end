import React,{ useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useStore} from '../store/store';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const {setToken, setLoginStatus} = useStore();
    const tokenValue = useStore((state) => state.token);
    const loginStatus = useStore((state) => state.loginStatus);

    const formValidation = () => {
        return email.length > 0 && password.length > 0
    }
    const loginFunction = async (email,password) =>{
        let data = JSON.stringify({
            "Email": email,
            "Password": password
          });
          console.log(data);

          let output;
          try{
            axios.post('https://im-app-ynh.herokuapp.com/api/v1/user/login',data)
            .then(function (response) {
              output = response.data;
              output['msg'] === 'Login Success' ? setToken(output['token']) : setToken("");
              output['msg'] === 'Login Success' ? setLoginStatus(true) : setLoginStatus(false);
            })
          }
          catch(error){
            console.log(error);
            output = error;
          };
          return output;
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try{
            await loginFunction(email,password);
            setLoading(false);
            if (loginStatus === true) 
                navigate("/");
        }
        catch(error){
            console.log(error)
            setLoading(false);
        }
    }

    return(
        <div className="login_form">
            <Form>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        autoFocus
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>
                <Button block size="lg" type="button" onClick={(e) => handleSubmit(e)} disable={!formValidation()}>
                    Login
                </Button>
            </Form>
            <div className='login_form'>
                <div className='alert_danger' role='alert'>
                    {loginStatus?tokenValue:"Login Failed"}
                </div>
            </div>
        </div>
    );
}
