import { useState } from 'react';
import { Redirect } from "react-router-dom"
import StarRating from '../components/StarRating';
import { MdDelete } from 'react-icons/md'
import ReactTooltip from 'react-tooltip';

const CompletedList = ({setMessageCompList,setShowNoteInput,localStorageKEYCompletedList, messageCompList, setBooksDetails, completedList, setCompletedList }) => {

    const [redirectToDetails, setRedirectToDetails] = useState(false)
    const removeBook = (id) => {
        setMessageCompList(false)
        const tempCompletedList = [...completedList]
        console.log(tempCompletedList);
        const remove = tempCompletedList.filter(item => item.id !== id)
        console.log(remove);
      localStorage.setItem(localStorageKEYCompletedList, JSON.stringify(remove))
        setCompletedList(remove)
    }
    const setRating = (id, rate) => {
        const temp = [...completedList]
        const index = temp.findIndex(item => item.id === id)
        temp[index].star = rate
        localStorage.setItem(localStorageKEYCompletedList, JSON.stringify(temp))
        setCompletedList(temp)
    }

    const NewCompletedList = completedList.map((book, i) => {
        console.log(book);
        return (
            <div key={i}>
                <StarRating id={book.id} startRate={book.star} setRate={setRating} />
                <h1>{book.volumeInfo.title}</h1>
                <h2>{book.volumeInfo.authors}</h2>
                <img src={book.volumeInfo.imageLinks.thumbnail} onClick={() => { setRedirectToDetails(true); setBooksDetails(book);setShowNoteInput(true)}} />
                <p>{book.volumeInfo.description.slice(0, 500)}</p>
                <MdDelete data-tip="delete" onClick={() => removeBook(book.id)} />
            </div>
        )
    })

    return (
        <div>

            {redirectToDetails ? < Redirect to={"Details"} /> : null}
            <h1 style={{ textAlign: "center" }}>{messageCompList ? "" : "add finished books "}</h1>
            {NewCompletedList}
            <ReactTooltip />
        </div>
    );
}

export default CompletedList;
