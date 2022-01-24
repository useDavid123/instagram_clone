import { Button } from '@material-ui/core'
import React ,{useState} from 'react'
import {db , storage} from "./firebase";
import firebase from "firebase/compat"
import "./ImageUpload.css"

const ImageUpload = ({username}) => {
    const [image , setImage] = useState(null)
    const [progress , setProgress] = useState(0)
    const [caption , setCaption] = useState('')

    const handleOnchange = (e) =>{
      if(e.target.files[0])
      {
          setImage(e.target.files[0])
      }
    }

    const handleUpload = (e) => {
        e.preventDefault()
        const uploadTask =  storage.ref(`images/${image.name}`).put(image)

        uploadTask.on(
            "state_changed",
            (snapshot)=>{
                // progress function
               const progress = Math.round(
                   (snapshot.bytesTransferred/ snapshot.totalBytes) * 100
               );
               setProgress(progress)
            },
            (error)=>{ 
                // error function
                console.log(error)
                alert(error.message)
            },
            ()=>{
            //    complete fuction
              storage.ref("images").child(image.name).getDownloadURL().then((url)=>{
                  db.collection("posts").add({
                      timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                      caption:caption,
                      imageUrl:url,
                      username:username
                  });
                  setImage(null)
                  setProgress(0);
                  setCaption('');
                  

              })
            }
        )
    }
    return (
        <div className="imageUpload_postcontainer" >
        <div className='imageUpload_post'>
            <progress className="imageupload_progress" value={progress} max="100" />
            <input type="text" value={caption} placeholder="Input Caption.." onChange={(e)=>setCaption(e.target.value)} />
            <input type="file" onChange={handleOnchange}  />
            <Button onClick={handleUpload} >Upload Post</Button>
        </div>
        </div>
    )
}

export default ImageUpload
