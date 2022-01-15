import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import style from './Home.module.css'

const Home = ({ setAuth, setBooksDetails, allBooks }) => {
    const [input, setInput] = useState("")
    const [redirectToDetails, setRedirectToDetails] = useState(false)

    const newArrBooks = allBooks.items.
        filter((data, i) => {
            if (input == "") {
                return data
            }
            else if (data.volumeInfo.title.toLowerCase().includes(input.toLowerCase()) || data.volumeInfo.authors[0]?.toLowerCase().includes(input.toLowerCase()) || data.volumeInfo.description.toLowerCase().includes(input.toLowerCase())) {

                return data.volumeInfo.title && data.volumeInfo.authors[0] && data.volumeInfo.description
            }
        })
        .map((book, i) => {
            return (

                <div className={style.container} key={i}>
                    <div className={style.card}>
                        <h2>{book.volumeInfo.title}</h2>
                        <p>{book.volumeInfo.authors}</p>
                        <img src={book.volumeInfo.imageLinks.thumbnail} onClick={() => { setRedirectToDetails(true); setBooksDetails(book) }} /></div>
                    <div className={style.card}> <p>{book.volumeInfo.description?.slice(0, 250)}</p></div><hr />
                </div>
            )
        })

    return (
        <div className={style.container}>

            {redirectToDetails ? < Redirect to={"Details"} /> : null}

            <form className={style.form}>
                search : <input type="text" onChange={(e) => setInput(e.target.value)} />
            </form>
            {newArrBooks.slice(0, 10)}
        </div>
    );
}

export default Home;
