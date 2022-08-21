import React,{createContext} from 'react'
import axios from 'axios'

export const MyCxt = createContext(0);

function MyContext(props) {

    const [data , setData] = React.useState([]);
    const [currentUser , setCurrentUser] = React.useState([]);
    
    const [RefreshPage , setRefreshPage] = React.useState(true);
    const [axiosUrl] = React.useState('https://abubkar-react-crud.000webhostapp.com/inter-active-comment-section-back-end/index.php');

    React.useEffect(() => {
      axios.get(axiosUrl
        ).then(res => {
          console.log(res);
          setData(res.data.comments);
          setCurrentUser(res.data.current_user);
        }).catch(err => {
          console.log(err);
        })
    },[RefreshPage])

    const value = {
      data,
      setData,
      currentUser, 
      setCurrentUser,
      RefreshPage,
      setRefreshPage,
      axiosUrl

    }
  return (
    <MyCxt.Provider value={value}>
        {props.children}
    </MyCxt.Provider>
  )
}

export default MyContext;