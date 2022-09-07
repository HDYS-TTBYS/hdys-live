import { useEffect, useState } from "react";
import './App.css';

function Chat() {
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
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

  const handleSubmit = () => {
    // TODO
  }

  return (
    <div className="scroll-container">
      <div className="scroll">
        {data.map(d => <section key={d} id={d}>{d}</section >)}
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className="form-label">名前:</label>
        <input type="text" className="form-control" id="name" placeholder="名無しさん" />
        <label htmlFor="exampleFormControlTextarea1" className="form-label">コメント:</label>
        <textarea className="form-control" id="exampleFormControlTextarea1" rows={3}></textarea>
        <div className="d-grid gap-2" >
          <input className="btn btn-primary" type="submit" value="送信"></input>
        </div>
      </form>
    </div >

  );
}

export default Chat;
