import Login from "./Login";
import style from "./OpeningPage.module.css"
import Register from "./Register";
import { useState } from 'react'
import { GrClose } from "react-icons/gr"


const OpeningPage = ({ localStorageKEY, setAuth }) => {
    const [login, setLogin] = useState(false);
    const [register, setRegister] = useState(false);

const hideLoginButton  = { display : register ? "none" : "block"}
const hideRegisterButton  = { display : login ? "none" : "block"}
    return (
        
        <div>
           
            <div  className={style.background } ></div>
               <div class={style.principal }>
                <h1>welcome</h1>
                <p>Bookshelf</p>
            </div>
            <div className={style.container}> {login ? null : <div >
               {  <button style={hideLoginButton} className={style.popup} onClick={() => setLogin(true)}>login</button>}
            </div>
            }
                {register ? null : <div>
                    <button style={hideRegisterButton}  className={style.popup}  onClick={() => setRegister(true)}>register</button>
                </div>}
            </div>

            {login ? <div >
                <GrClose className={style.removeLogin} onClick={() => setLogin(false)}>close</GrClose>
                <Login localStorageKEY={localStorageKEY} setAuth={setAuth} />
            </div> : null}

            {register ? <div  >
                <GrClose className={style.removeSinUp} onClick={() => setRegister(false)}>close</GrClose>
                <Register setAuth={setAuth} localStorageKEY={localStorageKEY}/>
            </div> : null}


        </div>
    );
}

export default OpeningPage;
