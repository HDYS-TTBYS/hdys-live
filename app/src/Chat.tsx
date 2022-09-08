import { useEffect, useState } from "react";
import './App.css';
import { getDatabase, ref, push } from "firebase/database";
import "./firebase";


function Chat() {
  const [data, setData] = useState<string[]>([]);

  const [name, setName] = useState("");
  const [comment, setComment] = useState("");


  useEffect(() => {
    if (localStorage.getItem("name")) {
      setName(localStorage.getItem("name")!)
    } else {
      localStorage.setItem("name", "名無しさん")
      setName("名無しさん")
    }


    // ここから
    let randomString: string[] = []
    const appendData = () => {
      for (let i = 0; i < Math.floor(Math.random() * (15 + 1 - 10)) + 10; i++) { //Max:25 Min:10
        randomString.push(Math.random().toString(32).substring(2))
      }
      // ここの処理をAPIからの取得のコードに変更する

      setData([...data, ...randomString])

      setTimeout(() => {
        appendData()
      }, 1000);
    }
    appendData()
  }, []);

  useEffect(() => {
    data.slice(-1)[0] && document.getElementById(data.slice(-1)[0])!.scrollIntoView({ behavior: "smooth" })
  }, [data])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // TODO
    e.preventDefault();
    const db = getDatabase()
    push(ref(db, "comment/"), {
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
        {data.map(d => <section key={d} id={d}>{d}</section >)}
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
