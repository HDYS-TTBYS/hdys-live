import { useEffect, useMemo, useState } from "react";
import './App.css';
import { getDatabase, ref, push, query, limitToLast, onValue } from "firebase/database";
import "./firebase";
import _ from 'lodash'

type CommentObject = {
  id: string
  name: string
  comment: string
}

const db = getDatabase()
const commentsRef = query(ref(db, "comment"), limitToLast(100))

function Chat() {
  const [comments, setComments] = useState<CommentObject[]>([]);

  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (localStorage.getItem("name")) {
      setName(localStorage.getItem("name")!)
    } else {
      localStorage.setItem("name", "名無しさん")
      setName("名無しさん")
    }

    onValue(commentsRef, (snapshot) => {
      const newComments: CommentObject[] = []
      snapshot.forEach((childSnapshot) => {
        const newComment: CommentObject = { id: childSnapshot.key!, name: childSnapshot.val().name, comment: childSnapshot.val().comment }
        newComments.push(newComment)
      })
      setComments(newComments)
    }, {})

  }, []);


  useEffect(() => {
    comments.slice(-1)[0] && document.getElementById(comments.slice(-1)[0].id)!.scrollIntoView({ behavior: "smooth" })
  }, [comments])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name === "" || comment === "") {
      return
    }

    push(ref(db, "comment"), {
      name: name,
      comment: comment
    })
    setComment("")
  }

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    localStorage.setItem("name", e.target.value);
  }


  return (
    <div className="scroll-container">
      <div className="scroll">
        {comments.map(c =>
          <div key={c.id} id={c.id}>{c.name}:
            <pre>{c.comment}</pre>
          </div >
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className="form-label">名前:</label>
        <input type="text" className="form-control" id="name" placeholder="名無しさん"
          value={name} onChange={handleChangeName} />
        <label htmlFor="exampleFormControlTextarea1" className="form-label">コメント:</label>
        <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} onChange={(e) => { setComment(e.target.value) }} value={comment} />
        <div className="d-grid gap-2" >
          <input className="btn btn-primary" type="submit" value="送信"></input>
        </div>
      </form>
    </div >

  );
}

export default Chat;
