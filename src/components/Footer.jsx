
import React from 'react'
import style from "./Footer.module.css"
import {FaGithub} from "react-icons/fa"
import {FaLinkedin} from "react-icons/fa"
import { Link } from 'react-router-dom'

const Footer = () => {
   return (
       <div className={style.footer}>
              <FaGithub className={style.git}> </FaGithub>
           <FaLinkedin className={style.git}> </FaLinkedin>
           <p>© 2022 Asres ferede</p>
       </div>
   )
}


export default Footer