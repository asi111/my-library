import { useState } from 'react';
import axios from "axios"
import GoogleAPI_KEY from '../../../constants';
import style from "./Login.module.css"


const Login = ({ localStorageKEY, setAuth }) => {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [emailErr, setEmailErr] = useState(false)
    const [PasswordErr, setPasswordErr] = useState(false)
    const [loading, setLoading] = useState(false);



    const login = async () => {

        try {
            const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${GoogleAPI_KEY}`
            setLoading(true)
            const response = await axios.post(url, {
                email: loginEmail,
                password: loginPassword
            })

            setAuth(response.data)
            localStorage.setItem(localStorageKEY, JSON.stringify(response.data.email))
            console.log(response);
        }

        catch (err) {
            console.log(err.response);
        }
        setLoading(false)


    }

    const isValid = () => {
        if (loginEmail === "") {
            setEmailErr(true)
        }

        else if (loginPassword.length < 6) {
            setPasswordErr(true)
        }

        else {

            login()
        }
        return true
    }

    return (


        <div className={style.container}>
            <div className={style.form} >
                <div className={style.cover}>
                    <h2>Login</h2>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        // login()
                        isValid()
                    }}>
                        <div className={style.box}>

                            <input type="email"onChange={(e) => setLoginEmail(e.target.value)} />
                            <label > Email </label>
                        </div>
                        <p style={{ color: "red" }}>{emailErr ? "empty filed" : ""}</p>

                        <div className={style.box}>
                          <label > Password </label>
                            <input type="password"  onChange={(e) => setLoginPassword(e.target.value)} />
                        </div>
                        <p style={{ color: "red" }}>{PasswordErr ? "The password is less than 6 characters" : ""}</p>


                        {loading ? "loading" : <button className={style.btn} type='submit'>login</button>}
                    </form>
                </div>

            </div>

        </div>
    );
}

export default Login;
