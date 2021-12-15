import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Register (){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [company,setCompany] = useState("");
    
    function formValidation() {
        return email.length > 0 && password.length > 0
    }
    function handleSubmit(event){
        event.preventDefault();
    }


    return(
        <div className="register_form">
            <Form onSubmit={handleSubmit}>
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
                <Form.Group size="lg" controlId="company">
                    <Form.Label>Company</Form.Label>
                    <Form.Control
                        autoFocus
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}/>
                </Form.Group>
                <Button block size="lg" type="submit" disable={!formValidation()}>
                    Register
                </Button>
            </Form>
        </div>
    );
}