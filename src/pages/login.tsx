import { Link } from 'react-router-dom';
import ErrorPanel from '../components/ErrorPanel';

export default function Login(){
    let currentError : string = "false";

    function ValidateLogin() {
        currentError = "WRONG";
    }

    return(
        <div>
            <h1>Welcome!</h1>
            <p>This is the login page, get to it!</p>
                <Link to={`/chat/`}>Go to chat!</Link>
                <br/>
                <span>
                    Username: <input></input><br/>
                    Password: <input type='password'></input><br/>
                </span>
                <button onClick={() => ValidateLogin()}>Login</button>
                {currentError ? (<ErrorPanel action='login' message={currentError}></ErrorPanel>) : null}
        </div>
    )
}