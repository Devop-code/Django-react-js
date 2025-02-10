import { useState, useEffect } from "react";
import api from "../api";
const HomePage = () => {
  const [note, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(()=>{
     getNote();
  },[])
  const getNote = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {setNotes(data); console.log(data)})
      .catch((error) => alert(error));
  };
  const deletNotes = (id)=>{
    api.delete(`/api/notes/delete/${id}/`).then((res)=>{
     if(res.status === 200){
      alert("Note deleted!")
     }
     else{
      alert("Error deleting note")
     }
    }).catch((error)=> alert())
  }
  return <div>home</div>;
};

export default HomePage
