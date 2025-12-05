import ColorSelector from '@/components/ColorSelector'
import { Navigate, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import ErrorPanel from '@/components/ErrorPanel';
import { useUserContext } from '@/contexts/UserContext';
import { createUseStyles } from 'react-jss';

const styles = createUseStyles({
    inline: {
        display: 'inline-block'
    }
})

export default function Login(){
    const user = useUserContext();
    const [error, setError] = useState("");
    const nameRef = useRef<HTMLInputElement>(null);
    const colorRef = useRef<HTMLInputElement>(null);
    let navigate = useNavigate();
    const css = styles();

    function handleLogin() {
        let name = nameRef.current!.value;
        if (name == ""){
            setError("You need to pick a name!!");
            return;
        }
        user.logInAction({userId: user.user.userId, name: name, color: (colorRef.current?.value as ColorValueHex)}); 
        navigate(`/chat/`);
    }

    const handleKeyPress = (evt: React.KeyboardEvent) =>{
        if (evt.key === 'Enter'){
            handleLogin();
        }
    }
    if (user.user.isLoggedIn()) return (<Navigate to="/chat"></Navigate>)

    return(
        <div>
            <h1>Welcome!</h1>
            <span>
                <label><b>Pick a username and a color: </b></label><br/>
                <span>
                    <input name="username" ref={nameRef} onKeyDown={handleKeyPress} className={css.inline}></input> &nbsp;
                    <ColorSelector ref={colorRef} className={css.inline}></ColorSelector>
                </span>
                <br/>
            </span>
            <button type="submit" onClick={handleLogin}>Login</button>
            {error ? (<ErrorPanel action='Login' message={error}></ErrorPanel>) : <></>}
        </div>
    )
}