import { useState, useEffect } from 'react';

const Details = ({insertKeyNoteToCompletedList,booksDetails,completedList, setCompletedList ,showNoteInput }) => {
    console.log(booksDetails);
   const getInput = (e)=>{
    insertKeyNoteToCompletedList(booksDetails.id,e.target.value)
   }

    const remove = (id) => {
        const tempCompletedList = [...completedList]
        console.log(tempCompletedList);
        const remove = tempCompletedList.filter(item => item.id !== id)
        console.log(remove);
        setCompletedList(remove)
    }
    const newNoteList = completedList.map((item, i) => {
        return (
            < div key={i}>
                <button onClick={() => remove(item.id)}>remove</button>
            </div>
        )
    })
   
    return (
        <div>
            <p>{booksDetails.volumeInfo?.title}</p>
            <img src={booksDetails.volumeInfo?.imageLinks.thumbnail}/>
            <p>{booksDetails.volumeInfo?.description}</p>

            <h3>notes</h3>
            { showNoteInput ?  <textarea onChange={(e) => {getInput(e) }} cols={"100"} rows={"10"} defaultValue={booksDetails.note}>
            </textarea> : null}


        </div>
    );
}

export default Details;
