import { useState } from "react";
import {useAuth} from '../context/AuthContext'

export function LoginForm(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const{login} = useAuth(); //Acess login function from context

    const handlesubmit = (e) => {

        e.preventDefault();
        //simulate API call
        const userData = {name:'Astra', email};
        login(userData); // update global auth state
    };

    return (
        <form onSubmit={handlesubmit}>
            <input
             type = "email"
             value = {email}
             onChange={(e) => setEmail(e.target.value)}
             placeholder="Email"
            >
            </input>
            <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>

        </form>
    )
}

