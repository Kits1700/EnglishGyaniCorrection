import React,{ useRef,useEffect,useState } from 'react';
import ReactDOM from 'react-dom/client';
import './Form.css';
import { firestore } from "./firebase";
import { addDoc,collection,doc,setDoc,getDoc,onSnapshot,query } from "@firebase/firestore";
import { getFirestore } from "@firebase/firestore";
import { type } from '@testing-library/user-event/dist/type';
import './Ques';
import Ques1 from './Ques';
import { Routes, Route, useNavigate} from 'react-router-dom';
  
const Home = () => {
    const messageRef = useRef();
    const ref = collection(firestore,"contentRecs");
    // const history = useHistory();
    const navigate = useNavigate();
    var [posts, setPosts] = useState([]);
    const db = getFirestore();
    //const refDb = db.collection('contentRecs');
    const shoot = () => {
      alert("HELLOO!");
    }
    useEffect(() => {
      const q = query(collection(db, 'contentRecs'))
      onSnapshot(q, (querySnapshot) => {
        const posts = []
        querySnapshot.forEach((doc) => {
    
          posts.push(doc.id);
         
        })
  
        setPosts(posts)
        
      })
    }, [])
  
    const handleSave = async(e) => {
        console.log("HI");
       
      e.preventDefault();
  
      console.log("Next");
      console.log(posts[0]);
      console.log(typeof(posts[0]));
      for(let i=0;i<posts.length;i++)
      {
        if(messageRef.current.value == posts[i])
        {
            navigate('/about');
         console.log("MATCH");
        
  
         
  
  
        }
      }
  
  
  
      let data = {
        content: messageRef.current.value,
      }
  
      try {
        
        //addDoc(ref,data);
        if(messageRef.current.value == ref.id)
        {
          console.log("SAME!!!");
        }
      } catch (error) {
        console.log(error);
      }
    }
  
    return (
    
  <div class = "main">
  <div class="hero-image">
    <div class="hero-text">
     
    </div>
  </div>
  
  
   <form onSubmit={handleSave}>
  
          <input type="text" placeholder='Enter ID' ref={messageRef} />
          <button class = "button-9"><span>Submit</span></button>
     
      </form>
  
     
  </div>
  
  
  
      
    
    )
};
  
export default Home;