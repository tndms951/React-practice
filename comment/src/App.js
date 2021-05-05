import "./App.css";
import { useState } from "react";
import Commnet from "./comment";
import shortId from "shortid";

function App() {
  const [commentForm, setCommentForm] = useState("");

  const [comment, setComment] = useState([
    {
      id: 1,
      content: "댓글1",
      comments: [
        {
          id: 2,
          content: "댓글2",
        },
        {
          id: 3,
          content: "댓글3",
        },
      ],
    },
    {
      id: 4,
      content: "댓글4",
      comments: [],
    },
    {
      id: 5,
      content: "댓글5",
      comments: [
        {
          id: 6,
          content: "댓글6",
        },
      ],
    },
    {
      id: 7,
      content: "댓글7",
      comments: [
        {
          id: 8,
          content: "댓글8",
        },
      ],
    },
  ]);
  console.log(comment);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newList = [...comment];
    const updateList = {
      id: shortId.generate(),
      content: commentForm,
      comments: [],
    };
    newList.unshift(updateList);
    setComment(newList);
    setCommentForm("");
  };

  const commenthandle = (e) => {
    setCommentForm(e.target.value);
  };

  const handleRecommentSubmit = (listId, recommendForm) => {
    const newList = [...comment];
    const updateIndex = newList.findIndex((index) => index.id === listId);
    const newAdd = {
      id: shortId.generate(),
      content: recommendForm,
    };
    newList[updateIndex].comments.unshift(newAdd);
    setComment(newList);

    // newList.comments.unshift();
    // setComment(newList);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div>
        <h1>댓글</h1>
        <form onSubmit={handleSubmit}>
          <textarea onChange={commenthandle} value={commentForm} />
          <button>등록</button>
        </form>
      </div>
      <div>
        {comment.map((list) => (
          <Commnet
            list={list}
            handleRecommentSubmit={handleRecommentSubmit}
            key={`comment-${list.id}`}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
