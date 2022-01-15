import { useState } from 'react';
import axios from "axios"
import GoogleAPI_KEY from '../../../constants';
import style from "./Register.module.css"



const Register = ({ setAuth ,localStorageKEY}) => {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [emailErr, setEmailErr] = useState(false)
    const [PasswordErr, setPasswordErr] = useState(false)
    const [ConfirmPasswordErr, setConfirmPasswordErr] = useState(false)
    const [loading, setLoading] = useState(false);
    const register = async () => {
        try {
            const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${GoogleAPI_KEY}`
            setLoading(true)
            const response = await axios.post(url, {
                email: registerEmail,
                password: registerPassword
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
        if (registerEmail === "") {
            setEmailErr(true)
        }

        else if (registerPassword.length < 6) {
            setPasswordErr(true)
        }

        else if (registerPassword != confirmPassword) {
            setConfirmPasswordErr(true)

        }

        else {

            register()
        }
        return true
    }

    return (
        <div className={style.container}>
            <div className={style.form}>
                <div className={style.cover}>
                    <h2>signUp</h2>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        isValid()

                    }}>
                        <div className={style.box}>  <label>Email</label> <input type="email" onChange={(e) => setRegisterEmail(e.target.value)} /></div>
                        <p style={{ color: "red" }}>{emailErr ? "empty filed" : ""}</p>
                        <div className={style.box}>  <label>Password</label> <input type="password" onChange={(e) => setRegisterPassword(e.target.value)} /></div>
                        <p style={{ color: "red" }}>{PasswordErr ? "The password is less than 6 characters" : ""}</p>

                        <div className={style.box}>  <label>ConfirmPassword</label><input type="password" onChange={(e) => setConfirmPassword(e.target.value)} /></div>
                        <p style={{ color: "red" }}>{ConfirmPasswordErr ? "password not match" : ""}</p>

                        {loading ? "loading" : <button className={style.btn} type='submit'>Register</button>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
