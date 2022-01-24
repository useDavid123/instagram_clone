import React , {useState, useEffect} from 'react'
import Avatar from "@material-ui/core/Avatar"
import {db} from "./firebase"
import firebase from "firebase/compat"
import "./Post.css"

const Post = ({user ,postId , username  , imageUrl , caption}) => {
   const [comments , setComments] = useState([])
   const [comment , setComment] = useState('')

    const handleComment = (e) => {
        e.preventDefault()
        db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .add({
            text:comment,
            username:user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),

        });
        setComment("")
    }


    useEffect(() => {
        let unsubscribe
           if(postId) {
            unsubscribe = db
             .collection("posts")
             .doc(postId)
             .collection("comments")
             .orderBy("timestamp" , "desc")
             .onSnapshot((snapshot)=>{
                 setComments(snapshot.docs.map((doc) => doc.data()))
             })
           }
             return () =>{
                 unsubscribe();
             }
    
       }, [postId])
    //   console.log(comments)
    return (
        <div className="post">
            <div className="post_header" >
           
           
            <Avatar
            className="post_avatar"
            alt="David"
            src="/static/images/avatar/1.jpg"
            />
             <h3>{username}</h3>
            </div>
            
            <img src={imageUrl}
            className="post_image"
            alt=""
            /> 
               <h4 className="post_text"><strong >{username}: </strong> {caption} </h4>

               <div className="post_comments" >
                   {
                       comments.map((comment , index)=>{
                           return(
                              
                               <p key={index}> <strong>{comment.username}</strong> : {comment.text}
                               </p>
                              
                           )
                       })
                   }
               </div>
    {
        user && (
            <form  className="post_commentbox">
            <input
             type="text"
             placeholder="Add comment"
             className="post_commentinput"
             value={comment}
             onChange={(e)=> setComment(e.target.value)}
             />
             <button
             disabled={!comment}
             className="post_commentbutton"
             onClick={handleComment}
             type="submit"
             > 
              Post
             </button>
  
             
          </form>
        )
    }

               
        </div>

       
    )
}

export default Post
