import React, { useRef, useEffect, useState } from "react";
import "./Form.css";
import firebase from "./firebase";
import {
  getDatabase,
  ref,
  child,
  get,
  update,
  set,
  push,
  onValue,
  on,
} from "firebase/database";
import { auth } from "./base";
import "firebase/compat/database";
import Navbar1 from "./Navbar1";
import Footer from "./Footer";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import google from "./google";
import { useLocation, useSearchParams } from "react-router-dom";
import Cookies from "js-cookie";

export default function Form({ user }) {
  var currentques;
  var currentans;
  const [data1, setData1] = useState([]);
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [option5, setOption5] = useState("");
  const [option6, setOption6] = useState("");
  const [show1, setShow] = useState("");

  var temp100;
  var temp102;
  var temp101;
  let flagP;
  var questionLen = [];
  const [b, setB] = useState([]);
  const [queslen, setQuesLength] = useState([]);
  const [quesnewlen, setNewQuesLen] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [category, setCategory] = useState([]);
  const [topic, setTopic] = useState([]);
  const [type, setType] = useState([]);
  const [ques, setQues] = useState([]);
  const [td, setTD] = useState([]);
  const [teacherInfo, setTeacherInfo] = useState([]);
  const [t, setT] = useState([]);
  const [corr, setCorr] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const [quesArr, setQuesArr] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [newiN, setIN] = useState([]);
  const [sumT, setSum] = useState([]);
  const [newq, setNewq] = useState([]);
  const [newchoices, setNewchoices] = useState([]);
  const [newans, setNewans] = useState([]);
  const [newk, setK] = useState([]);
  const [count1, setCount1] = useState([]);
  const [TN, setTopicName] = useState([]);
  const [profile, setProfile] = useState([]);
  const [flagD, setFlagD] = useState([]);
  const [flagM, setFlagM] = useState([]);
  var userCount;
  var noCorr;
  var keysvar = "RecX-1-2-3";
  const usercounts = [];
  var flagShow = 0;
  const [comment, setComment] = useState('');

 
  var currIn = parseInt(localStorage.getItem("index"), 10);
  var recordCount = 0;
  useEffect(() => {
    welcometoast();
  }, []);
  useEffect(() => {
    welcometoast();
  }, []);

  // useEffect(() => {
  //   let userId;
  //   firebaseRef.child("users").once("value", (snapshot) => {

  //     const users = snapshot.val();
  //     let userId;

  //     Object.keys(users).forEach((key) => {
  //       if (users[key].name === user.displayName) {
  //         userId = key;

  //       }
  //     });

  //   });
  //   // Retrieve the last question index from Firebase on component mount
  //   firebaseRef.child(`users/${userId}/${TN}/currentQuestionIndex`).once("value", (snapshot) => {
  //     const savedQuestionIndex = snapshot.val();
  //     if (savedQuestionIndex !== null) {
  //       setCurrentQuestionIndex(savedQuestionIndex);
  //     }
  //   });
  // }, []);
  useEffect(() => {
    const firebaseRef1 = firebase.database().ref();
    firebaseRef1.child("users").on("value", (snapshot) => {
      const users = snapshot.val();
      let userId;
      Object.keys(users).forEach((key) => {
        if (users[key].name === user.displayName) {
          userId = key;
          userCount = users[key].numCorrected;
          noCorr = users[key].noCorrections;
          console.log(userCount);
          setCount1(userCount);
          setCorr(noCorr);
        }
      });
    });
    usercounts.push(<p>{userCount}</p>);
  }, [user]);

  useEffect(() => {
    firebaseRef.child("users").on("value", (snapshot) => {
      const users = snapshot.val();
      let userId;
      Object.keys(users).forEach((key) => {
        if (users[key].name === user.displayName) {
          userId = key;
        }
      });

      try {
        firebaseRef
          .child("users")
          .child(userId)
          .child("quesLen")
          .once("value", (snapshot) => {
            let sum = 0;
            snapshot.forEach((childSnapshot) => {
              const length = parseInt(childSnapshot.val().length);
              sum += length;
            });

            const SUM = sum;
            console.log("Sumff");
            console.log("Sum:", SUM);
            setSum(SUM);
          });
      } catch (error) {
        console.error("Error:", error);
      }
    });
  }, []);
  useEffect(() => {
    setShow(0);
    localStorage.setItem("DisplayTotal", 0);
  });

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const storedData = localStorage.getItem("data1");
        if (storedData) {
          setData1(JSON.parse(storedData));
          console.log("Data found in the local storage.");
        } else {
          const snapshot = await get(
            child(ref(getDatabase()), "data/questionbank")
          );
          if (snapshot.exists()) {
            const questionData = snapshot.val();

            setData1(questionData);
            localStorage.setItem("data1", JSON.stringify(questionData));
          } else {
            console.log("No data found in the database.");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    console.log("Only once");
    fetchData1();
    console.log("Data1", data1);
  }, []);

  const logOut = () => {
    googleLogout();
    setProfile(null);
  };
  const handleGoBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  const nextQues = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setComment('');
    // console.log("QUESLENNN",q)
    if (currentQuestionIndex == queslen - 2) {
      localStorage.setItem("UpdateFlag", 0);
      localStorage.setItem("currentQuestionIndex", 0);
      saveAndClear();
    }
    if (currentQuestionIndex == queslen - 1) {
      console.log("TOAST NEEDED");
      localStorage.setItem("UpdateFlag", 0);
      localStorage.setItem("currentQuestionIndex", 0);
      endtopictoast();
      setCurrentQuestionIndex(0);

      saveAndClear();
      
    }
    console.log("CurrentIndex", currentQuestionIndex);
  };
  console.log("QUESaa", queslen - 2);
  var countNC = 0;
  function increaseCount() {
    // preUpdate();

    splitKey = keysvar.split("-");

    recIdInt = splitKey[0];
    iInt = parseInt(splitKey[1]);
    jInt = parseInt(splitKey[2]);
    kInt = parseInt(splitKey[3]);
    const newCount = countNC + 1;
    firebaseRef.child("users").once("value", (snapshot) => {
      const users = snapshot.val();
      let userId;

      Object.keys(users).forEach((key) => {
        if (users[key].name === user.displayName) {
          userId = key;
        }
      });

      if (userId) {
        firebaseRef
          .child(`users/${userId}/noCorrections`)
          .transaction((count) => (count || 0) + 1);
        successtoast();
      }
    });

    firebaseRef.child("users").once("value", (snapshot) => {
      const users = snapshot.val();
      let userId;
      Object.keys(users).forEach((key) => {
        if (users[key].name === user.displayName) {
          userId = key;
        }
      });

      var teacher = data1[recIdInt].topics_content[iInt].teacher_info;
      var cat = data1[recIdInt].category_id;
      var topic = data1[recIdInt].topics_content[iInt].topic_id;
      var td =
        data1[recIdInt].topics_content[iInt].topic_content[kInt]
          .level_difficulty;
      var typeq = data1[recIdInt].topics_content[iInt].topic_content[kInt].type;
      var qid =
        data1[recIdInt].topics_content[iInt].topic_content[kInt].level_content
          .questions[jInt].qid;
      temp102 =
        teacher + "_" + cat + "_" + topic + "_" + td + "_" + typeq + "_" + qid;
      if (userId) {
        firebaseRef.child(`users/${userId}/noCorrID`).push(temp102);
      }
    });

    // setTimeout(nextQues, 2000);
    setShow(1);
    flagShow = 1;
  }

  function arraysAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }

    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }

    return true;
  }

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
    setT(event.target.value);
  };
  const handleOption5Change = (event) => {
    setOption5(event.target.value);
    setTD(event.target.value);
  };
  const handleOption6Change = (event) => {
    setOption6(event.target.value);
    setQues(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };
  const firebaseRef = firebase.database().ref();
  const currentUser = firebase.auth().currentUser;

  firebaseRef.child("users").once("value", (snapshot) => {
    const users = snapshot.val();
    let userId;
    let flaguser = 0;

    Object.keys(users).forEach((key) => {
      if (users[key].name === user.displayName) {
        userId = key;

        flaguser = 1;
      }
    });

    if (flaguser == 0) {
      firebaseRef.child("users").push({
        name: user.displayName,
        email: user.email,
        numCorrected: 0,
        noCorrections: 0,
        quescorr: [],
        noCorrID: [],
        incorrID: [],
        quesLen: [],
        currentQuestionIndex: 0,
      });
    }
  });

  const options4 = [];
  for (let i = 1; i <= 100; i++) {
    options4.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }
  const options2 = [];
  for (let i = 1; i <= 33; i++) {
    options2.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }
  function toast() {
    var x = document.getElementById("toast");
    x.className = "show";
    setTimeout(function() {
      x.className = x.className.replace("show", "");
    }, 5000);
  }
  function successtoast() {
    var x = document.getElementById("successtoast");
    x.className = "show";
    setTimeout(function() {
      x.className = x.className.replace("show", "");
    }, 3000);
  }
  function savetoast() {
    var x = document.getElementById("toastsave");
    x.className = "show";
    setTimeout(function() {
      x.className = x.className.replace("show", "");
    }, 3000);
  }

  function welcometoast() {
    var x = document.getElementById("welcometoast");
    x.className = "show";
    setTimeout(function() {
      x.className = x.className.replace("show", "");
    }, 3000);
  }

  function endtopictoast() {
    var x = document.getElementById("endtopictoast");
    x.className = "show";
    setTimeout(function() {
      x.className = x.className.replace("show", "");
    }, 7000);
    localStorage.setItem("UpdateFlag", 0);
    localStorage.setItem("currentQuestionIndex", 0);
    saveAndClear();
  }

  function spacetoast() {
    var x = document.getElementById("spacetoast");
    x.className = "show";
    setTimeout(function() {
      x.className = x.className.replace("show", "");
    }, 3000);
  }

  const saveIDs = async () => {
    let teacher2 = teacher;
    let category2 = category;
    let topic2 = topic;
    let type2 = t;
    let topicdiff2 = td;

    temp101 =
      teacher2 +
      "_" +
      category2 +
      "_" +
      topic2 +
      "_" +
      type2 +
      "_" +
      topicdiff2;
    // console.log("TTEMP2", temp101);
    if (flagP == 1) {
      // console.log("FLAGP", flagP);
    } else {
      // console.log("FLAGP", flagP);
      // console.log("p", temp101);
      saveAndClear();
      toast();

      firebaseRef.child("users").once("value", (snapshot) => {
        const users = snapshot.val();
        let userId;
        Object.keys(users).forEach((key) => {
          if (users[key].name === user.displayName) {
            userId = key;
          }
        });
        if (userId) {
          firebaseRef.child(`users/${userId}/incorrID`).push(temp101);
        }
      });
    }
  };

  // var ref = firebase.database().ref('/data/questionbank');
  // ref.remove()
  //   .then(function() {
  //       console.log("Record deleted successfully");
  //   })
  //   .catch(function(error) {
  //       console.log("Error deleting record: " + error.message);
  //   });
  // Try saving dB locally, iterate through that

  var questionDictionary = {};

  const fetchData = async () => {
    setFlagD();
    setFlagM();

    const questionArray = [];
    if (data1) {
      Object.keys(data1).forEach((recId) => {
        for (let i = 0; i < data1[recId].topics_content.length; i++)
          for (
            let k = 0;
            k < data1[recId].topics_content[i].topic_content.length;
            k++
          ) {
            {
              if (data1[recId].topics_content[i].topic_content.type == "DND") {
                setFlagD(1);
              }
              if (
                category == data1[recId].category_id &&
                topic == data1[recId].topics_content[i].topic_name
              ) {
                setK(k);
                setTopicName(data1[recId].topics_content[i].topic_name);
                setTeacherInfo(data1[recId].topics_content[i].teacher_info);
                setIN(i);

                for (
                  let j = 0;
                  j <
                  data1[recId].topics_content[i].topic_content[k].level_content
                    .questions.length;
                  j++
                ) {
                  // console.log("QUESTIONLENGTH", data1[recId].topics_content[i].length);
                  flagP = 1;
                  questionArray.push(
                    data1[recId].topics_content[i].topic_content[k]
                      .level_content.questions[j]
                  );

                  var concatenatedKey = `${recId}-${i}-${j}-${k}`;
                  var question =
                    data1[recId].topics_content[i].topic_content[k]
                      .level_content.questions[j];
                  questionDictionary[concatenatedKey] = question;

                  // When the component initializes or loads:
                  const savedIndex = localStorage.getItem(
                    "currentQuestionIndex"
                  );
                  const startingIndex = savedIndex ? parseInt(savedIndex) : 0;
                  // Set the currentQuestionIndex to the value retrieved from localStorage
                  // or use 0 if it doesn't exist in the localStorage.
                  setCurrentQuestionIndex(startingIndex); // Assuming you have a state variable to store the currentQuestionIndex.
                }

                // setC(temp100);
              }
            }
          }

        setQuesArr(questionDictionary);
        setQuesLength(questionArray.length);

        // console.log("QUESTIONARRAY", questionArray.length);
      });

      questionLen.push(questionArray.length);

      // console.log("QUESTIONLEN", questionLen);
    }
    saveIDs();
    setNewQuesLen(questionLen);
    setShowResults(true);

    firebaseRef.child("users").on("value", (snapshot) => {
      const users = snapshot.val();
      let userId;
      Object.keys(users).forEach((key) => {
        if (users[key].name === user.displayName) {
          userId = key;
        }
      });

      try {
        firebaseRef
          .child("users")
          .child(userId)
          .child("quesLen")
          .once("value", (snapshot) => {
            let sum = 0;
            snapshot.forEach((childSnapshot) => {
              // console.log("KEYFD",childSnapshot.val().topic)
              // console.log("KEYFD2",typeof(childSnapshot.val().topic))

              if (childSnapshot.val().topic == topic) {
                // console.log("Matches!!");
                const length = parseInt(childSnapshot.val().length);
                setSum(length);
              } else {
                // console.log("NoMatch")
              }
              // const length = parseInt(childSnapshot.val().length);
              // sum += length;
            });

            // const SUM = sum;
            // console.log('Sumff');
            // console.log('Sum:', SUM);
            // setSum(SUM);
          });
      } catch (error) {
        // console.error('Error:', error);
      }
      firebaseRef
        .child(`users/${userId}/quesLen`)
        .orderByChild("topic")
        .equalTo(topic)
        .once("value", (snapshot) => {
          if (!snapshot.exists()) {
            firebaseRef
              .child(`users/${userId}/quesLen`)
              .push({ topic: topic, length: questionArray.length });
          }
        });
    });

    // console.log("INSIDEFUNCTION", questionArray.length);
    localStorage.setItem("DisplayTotal", 1);
  };

  console.log("QUESTTTT", quesnewlen);

  const handleQuestion = (event) => {
    setNewq(event.target.innerText);
  };

  const handleChoices = (event) => {
    if (event.target.innerText) {
      setNewchoices(event.target.innerText);
    } else {
      setNewchoices();
    }
  };

  const handleAns = (event) => {
    setNewans(event.target.innerHTML);
  };

  var splitKey;
  var recIdInt;
  var iInt;
  var jInt;
  var kInt;
  var oldQues;
  const preUpdate = () => {
    splitKey = keysvar.split("-");

    recIdInt = splitKey[0];
    iInt = parseInt(splitKey[1]);
    jInt = parseInt(splitKey[2]);
    kInt = parseInt(splitKey[3]);
    // console.log("QuesArrayLength", data1[recIdInt].topics_content[iInt].topic_content[kInt].level_content
    //   .questions.length);
    oldQues =
      data1[recIdInt].topics_content[iInt].topic_content[kInt].level_content
        .questions[jInt].question;
    setNewq(
      data1[recIdInt].topics_content[iInt].topic_content[kInt].level_content
        .questions[jInt].question
    );
    setNewans(
      data1[recIdInt].topics_content[iInt].topic_content[kInt].level_content
        .questions[jInt].answers
    );

    if (
      data1[recIdInt].topics_content[iInt].topic_content[kInt].type == "DND"
    ) {
      setNewchoices([]);
    }
    var teacher = data1[recIdInt].topics_content[iInt].teacher_info;
    var cat = data1[recIdInt].category_id;
    var topic = data1[recIdInt].topics_content[iInt].topic_id;
    var td =
      data1[recIdInt].topics_content[iInt].topic_content[kInt].level_difficulty;
    var typeq = data1[recIdInt].topics_content[iInt].topic_content[kInt].type;
    var qid =
      data1[recIdInt].topics_content[iInt].topic_content[kInt].level_content
        .questions[jInt].qid;
        var cmt;
    if(comment)
    {
      cmt = comment;
      temp100 =
      teacher + "_" + cat + "_" + topic + "_" + td + "_" + typeq + "_" + qid + "_" + cmt;
      
    }
   else{
    temp100 =
    teacher + "_" + cat + "_" + topic + "_" + td + "_" + typeq + "_" + qid;
   }
    // console.log("TEMP100", temp100);
    setB(temp100);
  };

  const updateData = async () => {
    const updates = {};

    var flagSpace = 0;
    var choicesArray = [];
    var arrayOfchoices = [];
    preUpdate();
    const hasChanges =
      (typeof newq === "string" && newq.trim() !== "") ||
      (typeof newchoices === "string" && newchoices.trim() !== "") ||
      (typeof newans === "string" && newans.trim() !== "");
    if (
      data1[recIdInt].topics_content[iInt].topic_content[kInt].type == "MTF"
    ) {
      // console.log("MTFFF");
      setNewchoices([]);
    }

    console.log(
      "Choices",
      data1[recIdInt].topics_content[iInt].topic_content[kInt].level_content
        .questions[jInt].choices
    );

    if (typeof newq === "undefined") {
      console.log("NEWQUNDEFINED", newq);
      setNewq(
        data1[recIdInt].topics_content[iInt].topic_content[kInt].level_content
          .questions[jInt].question
      );
      console.log("Newq un", newq);
      quesArr[keysvar].question =
        data1[recIdInt].topics_content[iInt].topic_content[
          kInt
        ].level_content.questions[jInt].question;
      console.log(
        "QUESTION",
        data1[recIdInt].topics_content[iInt].topic_content[kInt].level_content
          .questions[jInt].question
      );
      updates[
        "data/" +
          "questionbank/" +
          recIdInt +
          "/" +
          "topics_content" +
          "/" +
          iInt +
          "/" +
          "topic_content" +
          "/" +
          kInt +
          "/" +
          "level_content" +
          "/" +
          "questions" +
          "/" +
          jInt +
          "/" +
          "question"
      ] =
        data1[recIdInt].topics_content[iInt].topic_content[
          kInt
        ].level_content.questions[jInt].question;
    }

    if (
      typeof newchoices == "undefined" &&
      data1[recIdInt].topics_content[iInt].topic_content[kInt].type !== "MTF"
    ) {
      setNewchoices(
        data1[recIdInt].topics_content[iInt].topic_content[kInt].level_content
          .questions[jInt].choices
      );
      console.log("Newchoices un", newchoices);
      quesArr[keysvar].choices =
        data1[recIdInt].topics_content[iInt].topic_content[
          kInt
        ].level_content.questions[jInt].choices;
      choicesArray = newchoices.split("\n");
      arrayOfchoices = choicesArray.map((choice) => ({ choice }));
      updates[
        "data/" +
          "questionbank/" +
          recIdInt +
          "/" +
          "topics_content" +
          "/" +
          iInt +
          "/" +
          "topic_content" +
          "/" +
          kInt +
          "/" +
          "level_content" +
          "/" +
          "questions" +
          "/" +
          jInt +
          "/" +
          "choices"
      ] =
        data1[recIdInt].topics_content[iInt].topic_content[
          kInt
        ].level_content.questions[jInt].choices;
    }
    if (typeof newans === "undefined") {
      setNewans(
        data1[recIdInt].topics_content[iInt].topic_content[kInt].level_content
          .questions[jInt].answers
      );
      console.log("Newans un", newans);
      quesArr[keysvar].answers =
        data1[recIdInt].topics_content[iInt].topic_content[
          kInt
        ].level_content.questions[jInt].answers;

      updates[
        "data/" +
          "questionbank/" +
          recIdInt +
          "/" +
          "topics_content" +
          "/" +
          iInt +
          "/" +
          "topic_content" +
          "/" +
          kInt +
          "/" +
          "level_content" +
          "/" +
          "questions" +
          "/" +
          jInt +
          "/" +
          "answers"
      ] =
        data1[recIdInt].topics_content[iInt].topic_content[
          kInt
        ].level_content.questions[jInt].answers;
    }
    console.log("NEWQ", newq);
    console.log("NEWANS", newans);
    if (newq == "") {
      quesArr[keysvar].question =
        data1[recIdInt].topics_content[iInt].topic_content[
          kInt
        ].level_content.questions[jInt].question;

      updates[
        "data/" +
          "questionbank/" +
          recIdInt +
          "/" +
          "topics_content" +
          "/" +
          iInt +
          "/" +
          "topic_content" +
          "/" +
          kInt +
          "/" +
          "level_content" +
          "/" +
          "questions" +
          "/" +
          jInt +
          "/" +
          "question"
      ] =
        data1[recIdInt].topics_content[iInt].topic_content[
          kInt
        ].level_content.questions[jInt].question;
      console.log("NEWQ is null");
    }

    if (
      newchoices == "" &&
      data1[recIdInt].topics_content[iInt].topic_content[kInt].type !== "MTF"
    ) {
      quesArr[keysvar].choices =
        data1[recIdInt].topics_content[iInt].topic_content[
          kInt
        ].level_content.questions[jInt].choices;

      updates[
        "data/" +
          "questionbank/" +
          recIdInt +
          "/" +
          "topics_content" +
          "/" +
          iInt +
          "/" +
          "topic_content" +
          "/" +
          kInt +
          "/" +
          "level_content" +
          "/" +
          "questions" +
          "/" +
          jInt +
          "/" +
          "choices"
      ] =
        data1[recIdInt].topics_content[iInt].topic_content[
          kInt
        ].level_content.questions[jInt].choices;
    }

    if (newans == "") {
      console.log("NEWANS is null");
    }

    if (newq != "") {
      var newtrim = newq.replace(/\s+/g, " ").trim();
      var oldtrim = quesArr[keysvar].question.replace(/\s+/g, " ").trim();
      if (newtrim === oldtrim) {
        console.log("The trimmed versions are equal.");
        spacetoast();
        flagSpace = 1;
      } else {
        quesArr[keysvar].question = newq;
        data1[recIdInt].topics_content[iInt].topic_content[
          kInt
        ].level_content.questions[jInt].question = newq;
        updates[
          "data/" +
            "questionbank/" +
            recIdInt +
            "/" +
            "topics_content" +
            "/" +
            iInt +
            "/" +
            "topic_content" +
            "/" +
            kInt +
            "/" +
            "level_content" +
            "/" +
            "questions" +
            "/" +
            jInt +
            "/" +
            "question"
        ] = newq;
      }

      successtoast();
    }

    var newchoicestrim = [];
    var oldchoicestrim = [];
    if (
      newchoices != "" &&
      data1[recIdInt].topics_content[iInt].topic_content[kInt].type !== "MTF"
    ) {
      choicesArray = newchoices.split("\n");
      arrayOfchoices = choicesArray.map((choice) => choice.trim());
      newchoicestrim = choicesArray.map((choice) =>
        choice.replace(/\s+/g, " ").trim()
      );
      oldchoicestrim = quesArr[keysvar].choices.map((choice) =>
        choice.replace(/\s+/g, " ").trim()
      );

      console.log("NEWCHOICESTRIM", newchoicestrim);
      console.log("OLDCHOICESTRIM", oldchoicestrim);
      if (arraysAreEqual(newchoicestrim, oldchoicestrim)) {
        console.log("The trimmed versions are equal.");
        spacetoast();
        flagSpace = 1;
      } else {
        quesArr[keysvar].choices = arrayOfchoices;
        data1[recIdInt].topics_content[iInt].topic_content[
          kInt
        ].level_content.questions[jInt].choices = arrayOfchoices;
        updates[
          "data/" +
            "questionbank/" +
            recIdInt +
            "/" +
            "topics_content" +
            "/" +
            iInt +
            "/" +
            "topic_content" +
            "/" +
            kInt +
            "/" +
            "level_content" +
            "/" +
            "questions" +
            "/" +
            jInt +
            "/" +
            "choices"
        ] = arrayOfchoices;
      }

      successtoast();
    }

    if (newans != "") {
      var newanstrim = newans.replace(/(&nbsp;|\s)+/g, " ").trim();
      var oldanstrim = quesArr[keysvar].answers
        .replace(/(&nbsp;|\s)+/g, " ")
        .trim();

      console.log("NEWANSTRIM", newanstrim);
      console.log("OLDANSTRIM", oldanstrim);
      if (newanstrim == oldanstrim) {
        console.log("The trimmed versions are equal.");
        spacetoast();
        flagSpace = 1;
      } else {
        quesArr[keysvar].answers = newans;
        data1[recIdInt].topics_content[iInt].topic_content[
          kInt
        ].level_content.questions[jInt].answers = newans;
        updates[
          "data/" +
            "questionbank/" +
            recIdInt +
            "/" +
            "topics_content" +
            "/" +
            iInt +
            "/" +
            "topic_content" +
            "/" +
            kInt +
            "/" +
            "level_content" +
            "/" +
            "questions" +
            "/" +
            jInt +
            "/" +
            "answers"
        ] = newans;
      }

      successtoast();
      localStorage.setItem("UpdateFlag", 1);
    }
    localStorage.setItem("data1", JSON.stringify(data1));
    update(ref(getDatabase()), updates);
    saveAndClear();
    setShow(1);
    flagShow = 1;

    console.log("Updated QuesArr");

    firebaseRef.child("users").once("value", (snapshot) => {
      const users = snapshot.val();
      let userId;

      Object.keys(users).forEach((key) => {
        if (users[key].name === user.displayName) {
          userId = key;
        }
      });
      if (!hasChanges) {
        savetoast();
      }
      if (userId && hasChanges) {
        var countTopic = 0;
        if (flagSpace == 0) {
          countTopic = countTopic + 1;
          firebaseRef
            .child(`users/${userId}/quescorr`)
            .orderByValue()
            .equalTo(temp100)
            .once("value", (snapshot) => {
              if (!snapshot.exists()) {
                firebaseRef
                  .child(`users/${userId}/numCorrected`)
                  .transaction((count) => (count || 0) + 1);
                firebaseRef.child(`users/${userId}/quescorr`).push(temp100);
                // firebaseRef.child(`users/${userId}/quesLen`).orderByChild('topic').equalTo(TN).once('value', snapshot => {
                //   if (!snapshot.exists()) {
                //     firebaseRef.child(`users/${userId}/quesLen`).push({ topic: TN, length: quesnewlen });
                //   }
                // });

                firebaseRef
                  .child(`users/${userId}/quescorr`)
                  .once("value", (snapshot) => {
                    recordCount = snapshot.numChildren();
                    console.log("Number of records in quescorr:", recordCount);
                  });
                console.log("ID EXISTS ALREADY");
              }
            });
        }
      }
    });

    // refreshEditableContent();

    // location.reload();
  };
  const results = [];

  if (flagM == 1) {
    // console.log("MTF");
  } else if (flagD == 1) {
    // console.log("DND");
  } else {
  }
  function saveAndClear() {
    setNewq([]);
    setNewans([]);
    setNewchoices([]);
    setComment();
  }

  return (
    <div className="main">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <Navbar1 />
      <div>
        <script src="https://www.gstatic.com/firebasejs/7.17.1/firebase-app.js"></script>
        <script src="https://www.gstatic.com/firebasejs/7.17.1/firebase-database.js"></script>
      </div>
      <div className="dropdowns-container">
        <label htmlFor="dropdown2">Category ID:</label>
        <select id="dropdown2" value={option2} onChange={handleOption2Change}>
          <option value="Select an option" selected>
            Select an option
          </option>
          {options2}
        </select>

        <br />
        <br />
        <label htmlFor="dropdown3">Topic Name: </label>

        <input
          list="magicHouses"
          id="dropdown3"
          name="myHouse"
          placeholder="Type Topic Here..."
          onChange={handleOption3Change}
        />

        <datalist id="magicHouses">
          <option value="Present Perfect" />
          <option value="Plurals" />
          <option value="Give me / Possessive adjective" />
          <option value="There is / It is" />
          <option value="Time Expressions" />
          <option value="Infinitives or Gerunds" />
          <option value="Verb patterns" />
          <option value="First and Second Conditional" />
          <option value="Apostrophes: Is or Has" />
          <option value="Reason and Cause" />
          <option value="He's Been and Gone" />
          <option value="Like, Would Like, To Be like" />
          <option value="Modal Sentences" />
          <option value="Adjective into Adverb" />
          <option value='"To Be" Past and Present' />
          <option value="Punctuation" />
          <option value="Going To: Evidence or not" />
          <option value="Modals of Deduction" />
          <option value="-ed or -ing Adjectives" />
          <option value="Will or Going To" />
          <option value="How" />
          <option value="Pronouns and Contractions" />
          <option value="Present Perfect Continuous" />
          <option value="Enough" />
          <option value="Comparative and Superlative" />
          <option value="Position of Adverbs" />
          <option value="Participle Adjectives" />
          <option value="Compound Nouns" />
          <option value="Who didn't do what?" />
          <option value="Reflexive Pronoun" />
          <option value="Article: The town of Most" />
          <option value="Past Continuous" />
          <option value="In / At / On Prepositions" />
          <option value="Verb Tense Review" />
          <option value="Regular and Irregular Past Simple" />
          <option value="The Interview: Infinitive or Gerund" />
          <option value="Direct and Reported Speech" />
          <option value="Past Participle" />
          <option value="Present Continuous" />
          <option value="Confusing Words" />
          <option value="Third Conditional" />
          <option value="Negative Question Tag" />
          <option value="Subject Verb Advanced Agreement" />
          <option value="Regular and Irregular Plurals" />
          <option value="Numbers" />
          <option value="Simple past and past progressive" />
          <option value="For or Since?" />
          <option value="Contrasts" />
          <option value="Make / Let" />
          <option value="Verb" />
          <option value="Finished or Unfinished Time" />
          <option value="Modal Verbs" />
          <option value="QUESTION TAG SENTENCES" />
          <option value="Past Simple" />
          <option value="To be, Present Simple" />
          <option value="Relative Pronoun" />
          <option value="Preposition of time" />
          <option value="Used to" />
          <option value="Present Simple" />
          <option value="Have' and 'Be'" />
          <option value="Conjunctions" />
          <option value="Causative" />
          <option value="Can, Be able to" />
          <option value='Passive using "Get"' />
          <option value="Some / Any in a Restaurant" />
          <option value="Face Idioms" />
          <option value="First and Zero Conditional" />
          <option value="Time expressions" />
          <option value='"In Case"' />
          <option value="Second Conditional" />
          <option value="Regular and Irregular Verbs" />
          <option value="Gerund Sentences" />
          <option value="Passive Verb Patterns" />
          <option value="Should & Shouldn't Job Requirements" />
          <option value="Used to / Be Used To" />
          <option value="Reported Speech" />
          <option value="Conditional Forms" />
          <option value="Possessive Adjective" />
          <option value="Double Comparatives" />
          <option value="Some / Any" />
          <option value="Make, Let & Allow" />
          <option value="Subject & Object" />
          <option value="Could you / Could I" />
          <option value="Like, Would like, To be like" />
          <option value="Superlative / Comparative" />
          <option value="Was / Were" />
          <option value="Word Forms" />
          <option value="Give me / Possessive Adjective" />
          <option value="Do / Does" />
          <option value="Subject Verb Agreement" />
          <option value="Used to or Would" />
          <option value="Advanced Quantifiers" />
          <option value="Present Simple for Future" />
          <option value="Frequency Adverbs" />
          <option value="Count / Noncount Nouns" />
          <option value="So / Because" />
          <option value="Preposition" />
          <option value="Should" />
          <option value="Verb Patterns" />
          <option value="Superlative" />
          <option value="24 Hour Clock" />
          <option value="To be" />
          <option value="Pronouns" />
          <option value="Modals of Permission and Obligation" />
          <option value="Preposition of Time" />
          <option value="The Police is...The Police Are (There is...There are)" />
          <option value="Question tag Sentences" />
          <option value="Going to" />
          <option value="Future Continuous" />
          <option value='"Like" as Verb & Preposition' />
          <option value="Nouns & Enough" />
          <option value="Computer Messages: Present Perfect Passive" />
          <option value="Quantifiers" />
          <option value="Just, Yet, Already" />
          <option value="Passive or Active" />
          <option value="Modal Verbs of Deduction Practice" />
          <option value="Mustn't, Don't have to" />
          <option value="Question Tags" />
          <option value='"No" and "Not"' />
          <option value="Must and Have To" />
          <option value="Countable / Uncountable" />
          <option value="Irregular Verbs" />
          <option value="Active or Passive" />
          <option value="There is / There are" />
          <option value="Dialogue- Future Forms" />
          <option value="Wishes and Regrets Tense" />
          <option value="Discourse Markers" />
          <option value="Question Words" />
          <option value="Question Tag Sentences" />
          <option value="Inversion Structures" />
          <option value="Infinitive or Gerund" />
          <option value="Articles" />
          <option value="Present Simple Verb" />
          <option value="A man of habit: Present Perfect" />
          <option value="Phrasal Verbs" />
          <option value="To Be" />
          <option value="Has / Have" />
          <option value='"Some" and "Any"' />
          <option value="Relative Clauses: Defining and Non defining" />
          <option value="Quantifiers Question / Answer" />
          <option value="To Be / To Have" />
          <option value="Both or Either? Neither!" />
          <option value="Past Simple / Continuous" />
          <option value="Work, to work, working" />
          <option value="Negative Present Simple" />
          <option value='"For" and "Since"' />
          <option value="Present Perfect Simple or Continuous" />
          <option value="Expression of Time" />
          <option value="The Author: Present Simple or Continuous" />
          <option value='"All"' />
          <option value="Relative Pronouns Sentence Transformation" />
          <option value="Zero Conditional" />
          <option value="Animal Idioms" />
          <option value="Past Perfect" />
          <option value="Used to or past simple" />
          <option value="Future Continuous or Future Perfect?" />
          <option value="Possessive Adjectives" />
          <option value="Prepositions: John Lennon's Guitar" />
          <option value="Cause and Result" />
          <option value='"Needn&apos;t have done" or Didn&apos;t need to"' />
          <option value="Have To" />
          <option value="Can you / Can I" />
          <option value="Somewhere / Nowhere / Anywhere" />
          <option value="Relative pronouns Sentence Transformation" />
          <option value="Passive Sentences" />
          <option value="Irregular Past Simple" />
          <option value="Past Perfect - Chain of Events" />
          <option value="Spelling" />
          <option value="Present Simple or Present Continuous" />
          <option value="Past Simple or Present perfect" />
          <option value="Purpose, Reason, Result" />
          <option value="Few, A few, Little, A Little" />
          <option value="Comparative and Superlative Exercise" />
          <option value="Relative Pronoun - letter of Complaint" />
          <option value="Use of Future Tenses" />
          <option value="Can or Could" />
          <option value="Forms of Can" />
          <option value="The / The Comparatives" />
          <option value="Simple Past and Past Progressive" />
          <option value="Relative Pronouns in Dating Ads" />
          <option value="Mustn't, Don't Have to" />
          <option value="First Conditional" />
          <option value="Factory Signs : Must & Mustn't" />
          <option value="Past Tense" />
          <option value="If" />
          <option value="Past or Present" />
          <option value="Contractions" />
          <option value="Adjective and Present Simple Negative" />
          <option value="Mixed Conditional" />
          <option value="The Party" />
          <option value="Past Modal" />
          <option value="Plurals Spelling" />
          <option value="Have" />
          <option value="Reported Questions" />
          <option value="Indefinite Article" />
          <option value="Object Pronouns" />
          <option value="Modal Signs" />
          <option value="Say / Tell" />
          <option value="Not Allowed Signs" />
          <option value="Wishes and Regrets" />
          <option value="Myself, Yourself" />
          <option value="Question words" />
          <option value="Negative Contractions" />
          <option value="Contractions / Apostrophes" />
          <option value="Beginners Question Words" />
          <option value="Negative Question tag" />
          <option value="Comparative Structures" />
          <option value="Contrasting Ideas" />
          <option value="Capital Letters" />
          <option value="Comparative" />
          <option value="Adverbs of Manner" />
          <option value="Work, To work, Working" />
          <option value="Bored or Boring" />
          <option value="Irregular Plurals" />
          <option value="Preposition Of Time" />
          <option value="Can" />
          <option value="Subject / Object Pronoun" />
          <option value="Newspaper Headlines: Infinitive or Gerund" />
          <option value="Each other or Reflexive Pronoun" />
        </datalist>
      </div>
      <button className="submit" id="enterbtn" onClick={fetchData}>
        <i class="fa fa-sign-in" aria-hidden="true"></i> Enter
      </button>
      {showResults && !isNaN(parseInt(localStorage.getItem("DisplayTotal"))) && (
        <div>
          {currentQuestionIndex > sumT && (
            <>
              {setCurrentQuestionIndex(0)} {/* Set currentQuestionIndex to 0 */}
              {localStorage.setItem("currentQuestionIndex", 0)}{" "}
              {/* Update it in localStorage */}
            </>
          )}
          <p className="questioncorr">
            Total number of questions in {topic}: {currentQuestionIndex + 1}/
            {sumT}
          </p>
        </div>
      )}
      {showResults && (
        <>
          <p className="questioncorr">
            Number of questions corrected: {count1}
          </p>
          <p className="questioncorr">
            Number of questions for which correction is not needed: {corr}
          </p>
        </>
      )}

      <br></br>
      <div className="editableText">
        {
          <button className="submit" id="next" onClick={nextQues}>
            Next <i class="fa">&#xf105;</i>
          </button>
        }
        {console.log("HTMLLEN", queslen)}

        {currentQuestionIndex > 0 && (
          <button classname="submit" id="back" onClick={handleGoBack}>
            <i class="fa">&#xf104;</i> Back
          </button>
        )}
        <div className="question">
          {Object.keys(quesArr).map((key, index) => {
            if (index === currentQuestionIndex) {
              let userId;
              if (user) {
                firebaseRef.child("users").once("value", (snapshot) => {
                  const users = snapshot.val();

                  Object.keys(users).forEach((key) => {
                    if (users[key].name === user.displayName) {
                      userId = key;
                    }
                  });
                });
                // Set the user's currentQuestionIndex for the selected topic in Firebase
                firebaseRef
                  .child(`users/${userId}/currentQuestionIndex`)
                  .set(currentQuestionIndex)
                  .then(() => {
                    // Data successfully saved
                  })
                  .catch((error) => {
                    // Handle error if necessary
                    console.error(error);
                  });
              }
              // After the user finishes a question and `currentQuestionIndex` is updated:

              if (show1 == 1) {
                localStorage.setItem(
                  "currentQuestionIndex",
                  currentQuestionIndex
                );
              }

              const question = quesArr[key];
              keysvar = key;
              currentques = question.question;
              currentans = question.answers;

              return (
                <div key={key}>
                  {console.log("HTMLKEY", key)}
                  {(() => {
                    const [recID, i, j, k] = key.split("-");

                    // Access data from data1 using the extracted values
                    const category_name = data1[recID].category_name;
                    const teacher_info =
                      data1[recID].topics_content[i].teacher_info;
                    const topic_name =
                      data1[recID].topics_content[i].topic_name;
                    const level_difficulty =
                      data1[recID].topics_content[i].topic_content[k]
                        .level_difficulty;
                    const question_type =
                      data1[recID].topics_content[i].topic_content[k].type;
                    const question_desc =
                      data1[recID].topics_content[i].topic_content[k].desc;

                    // Now you can use these variables within the JSX
                    return (
                      <>
                        <div id="categoryname">
                          <strong>Category Name:</strong> {category_name}
                        </div>
                        <div id="teacherinfo">
                          <strong>Teacher Info:</strong> {teacher_info}
                        </div>
                        <div id="topicname">
                          <strong>Topic Name:</strong>
                          {topic_name}
                        </div>
                        <div id="leveldifficulty">
                          <strong>Difficulty Level:</strong>
                          {level_difficulty}
                        </div>
                        <div id="questiontype">
                          <strong>Question Type:</strong>
                          {question_type}
                        </div>
                        <br></br>
                        <div id="desc">{question_desc}</div>
                      </>
                    );
                  })()}

                  <div id="topic">
                    Question Difficulty: {question.question_difficulty_level}
                  </div>
                  <div id="topic">QID: {question.qid}</div>
                  <div>{question.desc}</div>
                  <div className="p1">Q:</div>
                  <div
                    id="one"
                    contentEditable="true"
                    onInput={handleQuestion}
                    spellCheck="true"
                  >
                    {question.question}
                  </div>
                  <br></br>

                  {flagD !== 1 && (
                    <div
                      id="two"
                      contentEditable="true"
                      onInput={handleChoices}
                      spellCheck="true"
                    >
                      {question.choices ? (
                        question.choices.map((choice, choiceIndex) => (
                          <span key={choiceIndex}>{choice}</span>
                        ))
                      ) : (
                        <span></span>
                      )}
                    </div>
                  )}
                  <br></br>
                  <div className="p1">Ans:</div>
                  <div
                    id="three"
                    contentEditable="true"
                    onInput={handleAns}
                    spellCheck="true"
                  >
                    {question.answers}
                  </div>
                </div>
              );
            } else {
            }
          })}
        </div>

        <br></br>
        <br></br>
        <br></br>
        <div id="toast">Invalid selection,try again!</div>
        <div id="toastsave">No change made!</div>
        <div id="successtoast">Updated Successfully!</div>
        <div id="welcometoast">Welcome {user.displayName}!</div>
        <div id="endtopictoast">End of topic,back to the beginning!</div>
        <div id="spacetoast">Only entered space!</div>

        
        {/* <textarea id="commentBox" rows="2" cols="50" placeholder="Add your comments here"></textarea> */}
<div className="buttonsbox">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <textarea
      id="commentBox"
      rows="4"
      cols="20"
      placeholder="Add your comments here"
      value={comment}
      onChange={handleCommentChange}
    ></textarea>
    </div>
    <button id="nobtn" className="submit" onClick={increaseCount}>
      No Correction
    </button>


        <div className="buttongrp">
          <button id="savebtn" className="submit" onClick={updateData}>
            <i class="fa fa-save"></i> Save
          </button>

          <button
            className="so"
            variant="outline-danger"
            type="submit"
            onClick={() => auth.signOut()}
          >
            <i class="fa fa-sign-out" aria-hidden="true"></i> Sign Out
          </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
