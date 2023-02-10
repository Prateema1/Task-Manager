import ListHeader from "./components/ListHeader"
import ListItem from "./components/ListItem"
import Auth from "./components/Auth"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const authToken = cookies.AuthToken
  const userEmail = cookies.Email
  const [tasks, setTasks] = useState(null)

  useEffect(() => {
    if(authToken) {
      getData()
    }
  }, [])

  const getData = async () => {
    try {
       const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`)
       const data = await response.json()
       setTasks(data)

    } catch (err) {
       console.log(err)
    }
  }

  //Sort task by date
  const sortedTasks = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date))

  return (
    <div className="app">
    {!authToken && <Auth />}
    {authToken &&
      <>
      <ListHeader listName={'Travel Itenary'} getData={getData} />
      <p className="user-email">Welcome {userEmail}</p>
    {sortedTasks?.map((task) =>
      <ListItem key={task.id} task={task} getData={getData} />
    )}
    </> }
    <p className="copyright">@ Creative Venture LLC</p>
    </div>
  )
}
export default App