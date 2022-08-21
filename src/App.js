import axios from 'axios'
import React from 'react'
import Comment from './components/Comment';
import {MyCxt} from './context/MyContext' ;



function App() {
  const {data,setData,currentUser,setCurrentUser,RefreshPage,setRefreshPage,axiosUrl} = React.useContext(MyCxt);

  const[newComment , setNewComment] = React.useState({crud_req : "new_comment" , make_comment : "" });


  const Comments = data.map(com => {
    return (
      <Comment key={com.comment_id} data={com} currentU = {currentUser} />
    )
  })
 

  const newCommentHandler = (e) => {
    const name = e.target.name ;
    const value = e.target.value ;
    setNewComment(prevInputs => ({...prevInputs  , [name] : value}));
  }

  const newCommentSubmit = (e) => {
    e.preventDefault();
    axios.post(axiosUrl , JSON.stringify(newComment)).then(res =>{
      console.log(res);
      setNewComment({crud_req : "new_comment" , make_comment : "" });
      setRefreshPage(prev => !prev);
    }).catch(err => {
      console.log(err);
    })
  }
  
  return (
    <div className="App">
      <div className='main-container'>
        {Comments}
      </div>
      <div className='make-comment'>
        <img src={currentUser.photo} alt='avatar' />
        <form onSubmit={newCommentSubmit}>
          <textarea name='make_comment' placeholder='Add a comment' onChange={newCommentHandler} value={newComment.make_comment}/>
          <button>SEND</button>
        </form>
      </div>
      
    </div>
  );
}

export default App;
