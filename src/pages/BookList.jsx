
import { useState } from 'react';
import { Redirect } from "react-router-dom";
import { MdAddTask } from 'react-icons/md'
import style from "./BookList.module.css"
import ReactTooltip from 'react-tooltip';

const BookList = ({ setMessageReadingList, setBooksDetails, insertBookToBooksList, books, loading }) => {
    const [redirectToDetails, setRedirectToDetails] = useState(false)
    console.log(books.items);
    const addBook = (i) => {
        setMessageReadingList(true)

        if (insertBookToBooksList(i)) alert('success')
        else alert('exists')
    }
    console.log(books);
    const NewBookList = books.items.map((book, i) => {
        return (
            <div className={style.container} key={i}>
                <div className={style.card}>
                    <h2> title : {book.volumeInfo.title}</h2>
                    <p> author : {book.volumeInfo.authors}</p>
                    <img src={book.volumeInfo.imageLinks.thumbnail} onClick={() => { setRedirectToDetails(true); setBooksDetails(book) }} /><hr />
                </div>
                <div className={style.card}>
                    <p>{book.volumeInfo.description?.slice(0, 200)}</p>
                </div>
                <div className={style.card}>
                    <MdAddTask data-tip="add book" className={style.icon} onClick={() => addBook(i)} />
                </div>

            </div>
        )
    })
    return (
        <div>
            {redirectToDetails ? < Redirect to={"Details"} /> : null}
            <p>{loading ? "loading" : ""}</p>
            {NewBookList.slice(0, 10)}
            <ReactTooltip />
        </div>
    );
}
export default BookList;
