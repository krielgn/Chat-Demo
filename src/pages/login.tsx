import ColorSelector from '@/components/ColorSelector'
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import ErrorPanel from '@/components/ErrorPanel';
import { useUserContext } from '@/contexts/UserContext';


export default function Login(){
    //const [user, setUser] = useState(new User({name: "", id: -1, color: getRandomColor()}));
    const user = useUserContext();
    const [error, setError] = useState("");
    const nameRef = useRef<HTMLInputElement>(null);
    const colorRef = useRef<HTMLInputElement>(null);

    function handleLogin() {
        //let newUser = new User();
        let name = nameRef.current!.value;
        if (name == ""){
            setError("Pick a name!!!")
        }
        
        user.logInAction({id: 12, name: name, color: (colorRef.current?.value as ColorValueHex)});        
    }

    return(
        <div>
            <h1>Welcome!</h1>
            <p>This is the login page, get to it!</p>
            <Link to={`/chat/`}>Go to chat!</Link>
            <br/>
            <span>
                <label>Username:<input name="username" ref={nameRef}></input></label><br/>
                <label>Color: </label><ColorSelector ref={colorRef}></ColorSelector><br/>
            </span>
            <button type="submit" onClick={handleLogin}>Login</button>
            {error ? (<ErrorPanel action='Login' message={error}></ErrorPanel>) : <></>}
        </div>
    )
}