import React,{useState , useEffect} from 'react';
import Post from "./Post"
import {auth, db} from "./firebase"
import { makeStyles } from '@material-ui/core/styles';
import Modal from "@material-ui/core/Modal";
import { Button , Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';
import InstagramEmbed from 'react-instagram-embed';
import MyComponent from 'react-fullpage-custom-loader'


function App() {

  




  useEffect(() => {
    
    db.collection("posts").orderBy("timestamp" , "desc").onSnapshot(snapshot =>{
      setPosts(snapshot.docs.map(doc=>({
        id:doc.id,
      
        post:doc.data()})));
      
    })
  }, [])
//  console.log(posts);
 function getModalStyle()
 {
   const top = 50;
   const left = 50;

   return{
     top: `${top}%`,
     left: `${left}%`,
     transform : `translate(-${top}% , -${left}%)`
   };
 }

 const useStyles = makeStyles((theme)=>({
   paper:{
     position:"absolute", 
     width:400,
     backgroundColor:theme.palette.background.paper,
     border: "2px solid #000",
     boxShadow: theme.shadows[5],
     padding: theme.spacing(2,4,3),
   },
 }))
 const [posts ,  setPosts] = useState([])
 const [open , setOpen] = useState(false)
 const [openLogin , setOpenLogin] = useState(false)
 const [username , setUsername] = useState('')
 const [email , setEmail] = useState('')
 const [password , setPassword] = useState('')
 const [user , setUser] = useState(null)
 const [loading , setLoading] = useState(true)
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle)
   

  useEffect(() => {
    
    const unsubscribe = auth.onAuthStateChanged((authUser)=>{
     
      if(authUser){
        // user has logged in
        console.log(authUser);
        setUser(authUser)
      }
      else {
        setUser(null)
      }
     
    })

    return () => {
      unsubscribe();
    }
  }, [user , username])
  console.log(user);
  const signUp = (e) => {
       e.preventDefault();

       auth
       .createUserWithEmailAndPassword(email , password)
       .then((authUser)=>{
         return authUser.user.updateProfile({
           displayName:username
         })
       })
       .catch((error)=>{
         alert(error.message)
       })

       setOpen(false)
  }

  const login = (e) => {
    e.preventDefault();
     auth.signInWithEmailAndPassword(email, password)
     .catch(function(error) {
     // Handle Errors here.
     var errorCode = error.code;
     var errorMessage = error.message;
     if (errorCode === 'auth/wrong-password') {
     alert('Wrong password.');
     } else {
     alert(errorMessage);
     }
     console.log(error);
     });
     setOpenLogin(false)
     console.log(user);
  }

return (

 


 <div className="app">
   {
       loading && (<MyComponent />)
      
     }
   <Modal 
   open={open}
   onClose={()=> setOpen(false)}
   >
     <div style={modalStyle}  className={classes.paper} >
       <form className="app_signup">
       <center>
       <img 
     className="app_headerImage"
     src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCfUsmcYEHuUOVyorQkLvlSqKfH55V82TVlg&usqp=CAU"
     alt=""
     />
       </center>
      <Input
      type="text"
      value={username}
      placeholder="username"
      onChange={(e)=>setUsername(e.target.value)}
      
      />
       <Input
      type="text"
      value={email}
      placeholder="Email"
      onChange={(e)=>setEmail(e.target.value)}
      
      />
       <Input
      type="password"
      value={password}
      placeholder="password"
      onChange={(e)=>setPassword(e.target.value)}
      
      />
       <Button type="submit" onClick={signUp}>Sign Up</Button>
      </form>
     </div>
     </Modal>
     {/* Login */}
     <Modal 
   open={openLogin}
   onClose={()=> setOpenLogin(false)}
   >
     <div style={modalStyle}  className={classes.paper} >
       <form className="app_signup">
       <center>
       <img 
     className="app_headerImage"
     src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCfUsmcYEHuUOVyorQkLvlSqKfH55V82TVlg&usqp=CAU"
     alt=""
     />
       </center>
     
       <Input
      type="text"
      value={email}
      placeholder="Email"
      onChange={(e)=>setEmail(e.target.value)}
      
      />
       <Input
      type="password"
      value={password}
      placeholder="password"
      onChange={(e)=>setPassword(e.target.value)}
      
      />
       <Button type="submit" onClick={login}>Sign Up</Button>
      </form>
     </div>
     </Modal>

     

    

<div className="app_header">
 
     <img 
     className="app_headerImage"
     src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCfUsmcYEHuUOVyorQkLvlSqKfH55V82TVlg&usqp=CAU"
     alt=""
     />

{
     user ?

      (<Button onClick={()=> auth.signOut()}>Log Out</Button>)
      :
       (
      <div className="app_logincontainer">
    <Button onClick={()=> setOpen(true)}>Sign Up</Button>
    <Button onClick={()=> setOpenLogin(true)}>Login</Button>

      </div>
       )
   }
  
   </div>
   
  <div className="app_posts" >
    <div className="app_postsleft">
    {
    posts.map(({post , id} , index)=>{
    return (
      <Post {...post} 
      key={index} 
        user={user}
        postId={id}
        />

    )

    })
  }
    </div>
    <div className="app_postsright">

    <InstagramEmbed 
    url="https://www.instagram.com/p/CUs55D8JaO/"
    maxWidth={320}
    hideCaption={false}
   
    containerTagName="div"
    protocol=""
    injectScript
    onLoading={()=>{}}
    onSuccess={()=>{}}
    onAfterRender={()=>{}}
    onFailure={()=>{}}

    />
    </div>
 
  </div>

{
    user?.displayName ? 
    (
      <ImageUpload username={user.displayName} />
    ) :
    (
      <center>
        <h1>You need to login to upload</h1>
      </center>
     
    )
  }

</div>
)
}

export default App;
