import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import './Form.css';
import firebase from './firebase';
import { getDatabase, ref, child, get,update,set,push } from "firebase/database";
import 'firebase/compat/database';
import Navbar from './Navbar';
import Footer from './Footer';

function Demo() {
    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState([]);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user ]
    );

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile(null);
    };
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');
  const [option5, setOption5] = useState('');
  const [option6, setOption6] = useState('');

  const [teacher,setTeacher] = useState([]);
  const [category,setCategory] = useState([]);
  const [topic,setTopic] = useState([]);
  const [type,setType] = useState([]);
  const [ques,setQues] = useState([]);
  const [td,setTD] = useState([]);
  const [sques,setSques] = useState([]);
  const [choices,setChoices] = useState([]);
  const [ans,setAns] = useState([]);
  const [qidtemp,setQid] = useState([]);

  const [newq,setNewq] = useState([]);
  const [newchoices,setNewchoices] = useState([]);
  const [newans,setNewans] = useState([]);
  const [newi,setI] = useState([]);
  const [keys,setKeys] = useState([]);


  const handleOption1Change = (event) => {
    setOption1(event.target.value);
    setTeacher(event.target.value);

  };

  const handleOption2Change = (event) => {
    setOption2(event.target.value);
    setCategory(event.target.value);
  
    
  };

  const handleOption3Change = (event) => {
    setOption3(event.target.value);
    setTopic(event.target.value);
    
  };

  const handleOption4Change = (event) => {
    setOption4(event.target.value);
    setType(event.target.value);

  };
  const handleOption5Change = (event) => {
    setOption5(event.target.value);
    setTD(event.target.value);
  };
  const handleOption6Change = (event) => {
    setOption6(event.target.value);
    setQues(event.target.value);
  };
  
  const options4 = [];
  for (let i = 1; i <= 100; i++) {
    options4.push(<option key={i} value={i}>{i}</option>);
  }
  const options2 = [];
  for (let i = 1; i <= 33; i++) {
    options2.push(<option key={i} value={i}>{i}</option>);
  }
  const options3 = [];
  for (let i = 1; i <= 20; i++) {
    options3.push(<option key={i} value={i}>{i}</option>);
  }

  function toast() {
    var x = document.getElementById("toast");
    x.className = "show";
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
  }
  function successtoast() {
    var x = document.getElementById("successtoast");
    x.className = "show";
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
  }
  const [data, setData] = useState([]);
  var test = []
  const fetchData = async () => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `data/questionbank`)).then((snapshot) => {
      if (snapshot.exists()) {
       
        snapshot.forEach((childSnapshot) => {
                const childData = childSnapshot.val();
                
                if((teacher==childData.teacher_info)&&(category==childData.category_id)&&(topic==childData.topic_id)&&(td==childData.topic_difficulty))
                {
                  console.log(childSnapshot.key);
                  setKeys(childSnapshot.key);
                  let q = ques;
                  for(let i =0;i<childData.questions.length;i++)
                  {
                    console.log("Ques",ques);
                    console.log("QID",childData.questions[i].qid)
                    if(ques ==childData.questions[i].qid )
                    {
                      setI(i);
                      setQid(childData.questions[i].qid);
                      setSques(childData.questions[i].question);
                  
                      setChoices(childData.questions[i].choices);
                     
                      if(childData.questions[i].question=="")
                      { 
                        setAns(childData.questions[i].answers);
                        
                      }
                    }
                 
                    // ques = parseInt(ques);
                   
                 
                  }
                  
                }
          
              
                if(ques!==qidtemp )
                { console.log("QIDTemp",qidtemp);
                  toast();
                }
          


              });
     
      } else { 
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  };
  const handleQuestion = (event) => {
    setNewq(event.target.innerText);
  };
  var i =0;
  var arrc = [];
  var arrc2 = [];
  var arr3 =[];
  var newarray = [];
  const handleChoices = (event) => {

    setNewchoices(event.target.innerText);
  
  }
 arrc = newchoices;
 console.log(Object.values(newchoices));
 console.log("String",arrc.toString());
 arrc2 = arrc.toString();
 console.log("arrc2",arrc2);
 arrc2 = arrc2.split(' ');
 arr3 = arrc2.toString();
 console.log("arrc22",arr3);
 arr3 = arr3.split('\n');
 console.log("arrc3",arr3);
 for(let i =0;i<arr3.length;i++)
 {
  if(arr3[i]!='')
  {
    newarray.push(arr3[i]);
  }
 }

 console.log("Newarr",newarray);
  const handleAns = (event) => {
    setNewans(event.target.innerText);

  }

  const updateData = async () => {
    const db = getDatabase();
    const updates = {};
    if(newq!="")
    {
        updates["data/" + "questionbank/" + keys + "/"+"questions" + "/" + newi + "/" + "question"] = newq;
         
    update(ref(db), updates);
    }
    if(newans!=""){
      updates["data/" + "questionbank/" + keys + "/"+"questions" + "/" + newi + "/" + "answers"] = newans;
     
      update(ref(db), updates);

    }

    for(let i =0 ;i<results.length;i++)
    {
      updates["data/" + "questionbank/" + keys + "/"+"questions" + "/" + newi + "/" + "choices" + "/" + i] = newarray[i];
 
      update(ref(db), updates);
    }
    successtoast();

  };

const results = [];
choices.forEach(choice => {
  results.push(
   <p>{choice}</p>
  );
  
});

console.log("jk");
console.log(arrc);
    return (
       <div>
{profile ? (
           <div className='main'>
           <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
           <Navbar />
              <div>
              <script src="https://www.gstatic.com/firebasejs/7.17.1/firebase-app.js"></script>
              <script src="https://www.gstatic.com/firebasejs/7.17.1/firebase-database.js"></script>
         <br></br>
         <br></br>
     
         </div>
         <div className="dropdowns-container">
           
           <label htmlFor="dropdown1">Teacher:</label>
           <select id="dropdown1" value={option1} onChange={handleOption1Change}>
             <option value="">Select an option</option>
             <option value="T1">T1</option>
             <option value="T2">T2</option>
             <option value="T3">T3</option>
           </select>
     
           <br />
     
           <label htmlFor="dropdown2">Category ID:</label>
           <select id="dropdown2" value={option2} onChange={handleOption2Change}>
           <option value="Select an option" selected>Select an option</option>
            {options2}
             
           </select>
     
           <br />
     
           <label htmlFor="dropdown3">Topic ID:</label>
           <select id="dropdown3" value={option3} onChange={handleOption3Change}>
           <option value="Select an option" selected>Select an option</option>
          {options3}
           </select>
           <label htmlFor="dropdown4">Type:</label>
           <select id="dropdown4" value={option4} onChange={handleOption4Change}>
             <option value="">Select an option</option>
             <option value="FITB">FITB</option>
             <option value="MCQ">MCQ</option>
             <option value="DND">DND</option>
             <option value="MTF">MTF</option>
           </select>
     
           <br />
           <label htmlFor="dropdown5">Topic Difficulty:</label>
           <select id="dropdown5" value={option5} onChange={handleOption5Change}>
             <option value="">Select an option</option>
             <option value="Beginners">Beginners</option>
             <option value="Elementary">Elementary</option>
             <option value="Pre-Intermediate">Pre-Intermediate</option>
             <option value="Intermediate">Intermediate</option>
             <option value="Upper Intermediate">Upper Intermediate</option>
             <option value="Advanced">Advanced</option>
           </select>
     
           <br />
          
           <label htmlFor="dropdown6">Question ID:</label>
           <select id="dropdown6" value={option6} onChange={handleOption6Change}>
           <option value="Select an option" >Select an option</option>
            {options4}
           </select>
           
     
         </div>
         <button className='submit' id = "enterbtn" onClick={fetchData}><i class="fa fa-sign-in" aria-hidden="true"></i> Enter</button>
     <div className='editableText'>
       <div className='question'>
     
     <p contentEditable="true" onInput={handleQuestion}>{sques}</p>
        <p contentEditable="true" onInput={handleChoices}>{results}</p>
        <p contentEditable="true" onInput={handleAns}>{ans}</p>
        <p>{profile.name}</p>
     </div>
     <br></br>
     <br></br>
     <br></br>
     <div id="toast">Invalid selection,try again!</div>
     <div id="successtoast">Updated Successfully!</div>
     <button className='submit' onClick={updateData}><i class="fa fa-save"></i> Save</button>
     </div>
     <Footer />
         </div>
        ) : (
            <button onClick={() => login()}>Sign in with Google 🚀 </button>
        )}
       </div>

    );

}
export default Demo;