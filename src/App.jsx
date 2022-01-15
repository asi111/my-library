import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import NavBar from './components/NavBar'
import BookList from './pages/BookList'
import UseAxios from './customHooks/UseAxios';
import GoogleAPI_KEY from '../../constants'
import ReadingList from './pages/ReadingList'
import Home from './pages/Home'
import CompletedList from './pages/CompletedList'
import Details from './pages/Details'
import OpeningPage from './pages/OpeningPage'
import PageNotFound from "./pages/PageNotFound"
import Footer from './components/Footer'

function App() {
  const localStorageKEY = "auth"
  const localStorageKEYBooksList = "bookList"
  const localStorageKEYReadingList = "redingList"
  const localStorageKEYCompletedList = "completedList"
  const [auth, setAuth] = useState(null)
  const [readingList, setReadingList] = useState([])
  const [completedList, setCompletedList] = useState([])
  const [noteInput, setNoteInput] = useState("")
  const [booksDetails, setBooksDetails] = useState({})
  const [messageReadingList, setMessageReadingList] = useState(false)
  const [messageCompList, setMessageCompList] = useState(false)
  const [showNoteInput, setShowNoteInput] = useState(false)
  const [books, setData, loading] = UseAxios(`https://www.googleapis.com/books/v1/volumes?q=books&orderBy=newest&key=${GoogleAPI_KEY}&maxResults=30`, auth, localStorageKEYBooksList)

  console.log(auth);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem(localStorageKEY));
    local ? setAuth(local) : null;


    setReadingList(JSON.parse(localStorage.getItem(localStorageKEYReadingList)))
    setCompletedList(JSON.parse(localStorage.getItem(localStorageKEYCompletedList)))
  }, []);
  const insertBookToBooksList = (index) => {
    const courantIndex = readingList.findIndex(item => item.id === books.items[Number(index)].id)
    if (courantIndex === -1) {
      const localStorageReadingList = JSON.parse(localStorage.getItem(localStorageKEYReadingList)) ?
        JSON.parse(localStorage.getItem(localStorageKEYReadingList)) : []

      localStorageReadingList.push(books.items[index])
      localStorage.setItem(localStorageKEYReadingList, JSON.stringify(localStorageReadingList))
      setReadingList(localStorageReadingList)
      return true
    }
    return false
  }

  const insertKeyNoteToCompletedList = (id, noteInput) => {
    const index = completedList.findIndex(item => item.id === id)
    const temp = JSON.parse(localStorage.getItem(localStorageKEYCompletedList)) ?
      JSON.parse(localStorage.getItem(localStorageKEYCompletedList)) : []
    temp[index].note = noteInput
    localStorage.setItem(localStorageKEYCompletedList, JSON.stringify(temp))

    setCompletedList(temp)
  }

  const insertToCompleted = (i) => {
    setMessageCompList(true)
    const index = completedList.findIndex(item => item.id === readingList[Number(i)].id)
    console.log(index);
    if (index === -1) {
      const tempLocalStorageCompletedList = JSON.parse(localStorage.getItem(localStorageKEYCompletedList)) ?
        JSON.parse(localStorage.getItem(localStorageKEYCompletedList)) : []
      tempLocalStorageCompletedList.push(readingList[i])

      localStorage.setItem(localStorageKEYCompletedList, JSON.stringify(tempLocalStorageCompletedList))
      setCompletedList(tempLocalStorageCompletedList)
      return true
    }
    return false

  }

  return (
    <div className="App">
      <Router>
        {auth ? <> <NavBar localStorageKEY={localStorageKEY} auth={auth} setAuth={setAuth} />   </> : null}
        <Switch>
          {auth && books ? <>
            <Redirect to='/' /> <Route exact path="/" render={() => <Home loading={loading} setAuth={setAuth} setBooksDetails={setBooksDetails} allBooks={books} setData={setData} />} ></Route>
            <Route exact path="/CompletedList" render={() => < CompletedList setMessageCompList={setMessageCompList} messageCompList={messageCompList} setShowNoteInput={setShowNoteInput} localStorageKEYCompletedList={localStorageKEYCompletedList} setBooksDetails={setBooksDetails} completedList={completedList} setCompletedList={setCompletedList} />}></Route>
            <Route exact path="/ReadingList" render={() => <ReadingList messageReadingList={messageReadingList} setMessageReadingList={setMessageReadingList} localStorageKEYReadingList={localStorageKEYReadingList} setBooksDetails={setBooksDetails} insertToCompleted={insertToCompleted} readingList={readingList} setReadingList={setReadingList} />}></Route>
            <Route exact path="/BooksList" render={() => <BookList setMessageReadingList={setMessageReadingList} loading={loading} setBooksDetails={setBooksDetails} insertBookToBooksList={insertBookToBooksList} books={books} readingList={readingList} setReadingList={setReadingList} />}></Route>
            <Route exact path="/Details" render={() => <Details showNoteInput={showNoteInput} insertKeyNoteToCompletedList={insertKeyNoteToCompletedList} booksDetails={booksDetails} setNoteInput={setNoteInput} noteInput={noteInput} setCompletedList={setCompletedList} completedList={completedList} />}></Route>
          </> : <OpeningPage setAuth={setAuth} localStorageKEY={localStorageKEY} />}
          <Route component={PageNotFound} />
        </Switch>

      </Router>
      {auth ? <Footer /> : ""}
    </div>
  )
}

export default App
