import {useAuth} from '../context/AuthContext';

export function UserProfile() {

    const {
        user, isAuthenticated, logout
    } = useAuth(); //Acess user data

    if(!isAuthenticated) {
        return <p>Please log in</p>
    }

    return (

        <div>
            <h2>Welcome, {user.name}!</h2>
            <p>Email: {user.email}</p>
            <button onClick={logout}>Logout</button>
        </div>
    )


}
