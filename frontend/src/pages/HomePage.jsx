import { useState, useEffect } from "react";
import api from "../api";
const HomePage = () => {
  const [note, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
 

 useEffect(() => {
    getNote();
  }, []);
  
  const getNote = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((error) => alert(error));
  };
  const deletNotes = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 200) {
          alert("Note deleted!");
        } else {
          alert("Error deleting note");
        }
      })
      .catch((error) => alert(error));
    getNote();
  };
  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { title,content })
      .then((res) => {
        if (res.status === 201) {
          alert("Note created!");
        } else {
          alert("Error creating note");
        }
      })
      .catch((error) => alert(error));
  };
  return (
    <div>
      <div>
        <h2>Notes</h2>
      </div>
      <h2>Create a Note</h2>
      <form onSubmit={createNote}>
        <label htmlFor="title">Title:</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) =>setTitle( e.target.value)}
          required
        />

        <label htmlFor="content">Content:</label>
        <br />
        <textarea
          name="content"
          id="content"
          value={content}
          required
          onChange={(e)=> setContent(e.target.value)}
        ></textarea>
        <br />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default HomePage;
