import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { MdDelete } from 'react-icons/md'
import { BsPatchCheckFill } from 'react-icons/bs'
import ReactTooltip from 'react-tooltip';

const ReadingList = ({localStorageKEYReadingList, setMessageReadingList,messageReadingList, setBooksDetails, readingList, insertToCompleted, setReadingList }) => {
    const [redirectToDetails, setRedirectToDetails] = useState(false)  
    const deleteBook = (id) => {
        const tempReadingList = [...readingList]
        console.log(tempReadingList);
        const remove = tempReadingList.filter(item => item.id !== id)
        console.log(remove);
        localStorage.setItem(localStorageKEYReadingList , JSON.stringify(remove))
        setReadingList(remove)
    }

    const addAndDeleteBooks = (i, id) => {
        setMessageReadingList(false)
        const tempReadingList = [...readingList]
        console.log(tempReadingList);
        const remove = tempReadingList.filter(item => item.id !== id)
        console.log(remove);
        localStorage.setItem(localStorageKEYReadingList , JSON.stringify(remove))
        setReadingList(remove)
        if (insertToCompleted(i)) alert('success')
        else alert('success')
    }

    const newReadingList = readingList.map((book, i) => {
        return (
            <div key={book.id}>
                <h1>{book.volumeInfo.title}</h1>
                <h2>{book.volumeInfo.authors}</h2>
                <img src={book.volumeInfo.imageLinks.thumbnail} onClick={() => { setRedirectToDetails(true); setBooksDetails(book) }} />
                <p>{book.volumeInfo.description.slice(0, 500)}</p>
                <MdDelete data-tip="delete" onClick={() => deleteBook(book.id)} />
                <BsPatchCheckFill data-tip="add book" onClick={() => addAndDeleteBooks(i, book.id)} />


            </div>
        )
    })
    return (
        <div>
            <h1 style={{ textAlign: "center" }}>{messageReadingList ? ""   : "add books to read" }</h1>
            {redirectToDetails ? < Redirect to={"Details"} /> : null}
            {newReadingList}
            <ReactTooltip />


        </div>
    );
}

export default ReadingList;
