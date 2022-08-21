import React from 'react'
import axios from 'axios';
import {MyCxt} from '../context/MyContext' ;

function Replays(props) {

    const rep = props.rep ;
    const currentUser = props.currentUser ;

    const {RefreshPage,setRefreshPage,axiosUrl} = React.useContext(MyCxt);

    const [editreplay , setEditReplay] = React.useState(false);

    const [deleteStatus , setDeleteStatus] = React.useState(false);

    const [editComment , SetEditComment] = React.useState({
        crud_req : "edit_comment",
        comment_id : rep.comment_id,
        edit_comment :rep.content
       })
    
    const editHandler = (e) => {
    const name = e.target.name ;
    const value = e.target.value ;
    SetEditComment(prevInputs => ({...prevInputs  , [name] : value}));
    
    }


    const editSubmit = (e) => {
        e.preventDefault();
        axios.post(axiosUrl , JSON.stringify(editComment)).then(res =>{
        console.log(res);
        setRefreshPage(prev => !prev);
        setEditReplay(prevS => !prevS);
        }).catch(err => {
        console.log(err);
        })
    }

    const deleteCommentHandler = (id) => {
        axios.post(axiosUrl , JSON.stringify({crud_req : 'delete' , comment_id : id })).then(res => {
            console.log(res);
            setDeleteStatus(prevS => !prevS);
            setRefreshPage(prev => !prev);
        }).catch(err => {
            console.log(err);
        })
    }


        // Score Control
        const addScoreHandler = (id) => {
            axios.post(axiosUrl , JSON.stringify({crud_req : 'score' , score_state: 'increment' , comment_id : id })).then(res => {
                console.log(res);
                setRefreshPage(prev => !prev);
            }).catch(err => {
                console.log(err);
            })
        }
    
        const minusScoreHandler = (id) => {
            axios.post(axiosUrl , JSON.stringify({crud_req : 'score' , score_state: 'decrease' , comment_id : id })).then(res => {
                console.log(res);
                setRefreshPage(prev => !prev);
            }).catch(err => {
                console.log(err);
            })
        }

  return (
    <div className='replay-comment' key={rep.comment_id}>
    <div className='info'>
        <img src={rep.user_avatar} alt='avatar'/>
        <h1>{rep.user_name}</h1>
    </div>
    {currentUser === rep.user_name ?
            editreplay ? 
                <form className='update-replay' onSubmit={editSubmit}>
                    <textarea name='edit_comment' onChange={editHandler} value={editComment.edit_comment}/>
                    <button>Update</button>
                </form>
                : <p>{rep.content}</p>
             : <p>{rep.content}</p>
                
            }
    <div className='score'>
        <span onClick={() => {addScoreHandler(rep.comment_id)}}>+</span>
        <span className='score-number'>{rep.score}</span>
        <span onClick={() => {minusScoreHandler(rep.comment_id)}}>-</span>
    </div> 
    {currentUser === rep.user_name &&
    <div className='control'>
        <div className='delete'>
            <i class="fa-solid fa-trash-can"></i>
            <span onClick={() => {setDeleteStatus(prevS => !prevS)}}>Delete</span>
        </div>
        <div className='edit'>
            <i class="fa-solid fa-pen"></i>
            <span onClick={() => {setEditReplay(prevS => !prevS)}}>Edit</span>
        </div>
    </div>
    }
    {deleteStatus &&     
        <div className='delete-main-container'>
            <div className='delete-container'>
                <h3>Delete Comment</h3>
                <p>
                    Are You Sure You Want To Delete This Comment? This Will Remove The Comment And Can't Be Undone.
                </p>
                <div className='delete-control'>
                    <button onClick={() => {setDeleteStatus(prevS => !prevS)}}>NO, CANCEL</button>
                    <button className='delete' onClick={() => {deleteCommentHandler(rep.comment_id)}}>YES, DELETE</button>
                </div>
            </div>
        </div>
    }
    
</div>
  )
}

export default Replays