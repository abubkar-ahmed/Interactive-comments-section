import React from 'react'
import axios from 'axios';
import {MyCxt} from '../context/MyContext' ;
import Replays from './Replays';



function Comment(props) {
    const {RefreshPage,setRefreshPage,axiosUrl} = React.useContext(MyCxt);

    const [replayStatus , setReplayStatus] = React.useState(false);
    const [editStatus , setEditStatus] = React.useState(false);
    const [deleteStatus , setDeleteStatus] = React.useState(false);

    
   const comment = props.data;
   const currentUser = props.currentU.user_name ;
   const currentUserPhoto = props.currentU.photo ;

    // Making Replay To Comment
   const [makeReplay , setMakeReplay] = React.useState({
        crud_req : "new_replay",
        replaing_to : comment.comment_id ,
        make_replay : "" ,
    })

    const replayHandler = (e) => {
        const name = e.target.name ;
        const value = e.target.value ;
        setMakeReplay(prevInputs => ({...prevInputs  , [name] : value}));
    }

    const replaySubmit = (e) => {
        e.preventDefault();
        axios.post(axiosUrl , JSON.stringify(makeReplay)).then(res =>{
          console.log(res);
          setRefreshPage(prev => !prev);
          setReplayStatus((prevS) => !prevS)

        }).catch(err => {
          console.log(err);
        })
    }
    // End Of Making Replay To Comment
    
   


    // Edit Comment     
   const [editComment , SetEditComment] = React.useState({
    crud_req : "edit_comment",
    comment_id : comment.comment_id,
    edit_comment :comment.content
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
        setEditStatus(prevS => !prevS);
        }).catch(err => {
        console.log(err);
        })
    }

   const EditRemove = () => {
    return (
    <div className='control'>
        <div className='delete'>
            <i class="fa-solid fa-trash-can"></i>
            <span onClick={() => {setDeleteStatus(prevS => !prevS)}}>Delete</span>
        </div>
        <div className='edit' >
            <i class="fa-solid fa-pen"></i>
            <span onClick={() => {setEditStatus(prevS => !prevS)}}>Edit</span>
        </div>
    </div>
    )
   }

   const replies = comment.replayes.map(rep => {
        return (
        <Replays key={rep.comment_id} rep={rep} currentUser={currentUser} />
        )
    })

    // Delete Comment 
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
    <div className='comment-container' > 
        <div className='comment' >
            <div className='info'>
                <img src={comment.user_avatar} alt='avatar'/>
                <h1>{comment.user_name}</h1>
            </div>
            {currentUser === comment.user_name ?
            editStatus ? 
                <form className='update-replay' onSubmit={editSubmit}>
                    <textarea  type='text' name='edit_comment' onChange={editHandler} value={editComment.edit_comment}/>
                    <button>Update</button>
                </form>
                : <p>{comment.content}</p>
             : <p>{comment.content}</p>
                
            }
            <div className='score'>
                <span onClick={() => {addScoreHandler(comment.comment_id)}}>+</span>
                <span className='score-number'>{comment.score}</span>
                <span onClick={() => {minusScoreHandler(comment.comment_id)}}>-</span>
            </div>
            {!(currentUser === comment.user_name) && 
                <div className='replay'>
                    <i class="fa-solid fa-reply"></i>
                    <span onClick={() => {setReplayStatus((prevS) => !prevS)}}>Replay</span>
                </div>
            }
            {currentUser === comment.user_name  && <EditRemove/>}
        </div>
        {replayStatus &&
            <div className='make-comment'>
                <img src={currentUserPhoto} alt='avatar' />
                <form onSubmit={replaySubmit}>
                    <textarea name='make_replay' placeholder={`Replay To ${comment.user_name}... `} onChange={replayHandler} value={makeReplay.make_replay}/>
                    <button>Replay</button>
                </form>
            </div>
        }
        {replies}
        {deleteStatus &&     
            <div className='delete-main-container'>
                <div className='delete-container'>
                    <h3>Delete Comment</h3>
                    <p>
                        Are You Sure You Want To Delete This Comment? This Will Remove The Comment And Can't Be Undone.
                    </p>
                    <div className='delete-control'>
                        <button onClick={() => {setDeleteStatus(prevS => !prevS)}}>NO, CANCEL</button>
                        <button className='delete' onClick={() => {deleteCommentHandler(comment.comment_id)}}>YES, DELETE</button>
                    </div>
                </div>
            </div>
        }
    </div>
  )
}

export default Comment