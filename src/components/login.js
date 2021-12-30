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
    
    let {setToken, setLoginStatus,setUserEmail} = useStore();
    const tokenValue = useStore((state) => state.token);
    const loginStatus = useStore((state) => state.loginStatus);

    const formValidation = () => {
        return email.length > 0 && password.length > 0
    }
    const loginFunction = async (email,password) =>{
        // let data = JSON.stringify({
        //     "email": email,
        //     "password": password
        //   });
        let data = JSON.stringify({
            "email": email,
            "password": password
          });
          
          let config = {
            method: 'post',
            url: 'http://localhost:3000/api/auth/login',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          try{
            axios(config)
            .then(function (response) {
            if (response.status === 200){
                setLoginStatus(true)
                setUserEmail(email)
                setToken(response.data['token'])
            } else {
                setLoginStatus(false)
            } 
                
            })
          }
          catch(error){
            console.log(error);
          };
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try{
            await loginFunction(email,password);
            setLoading(false)
            console.log(tokenValue)
            if(tokenValue!== "") navigate("/")
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
        </div>
    );
}
