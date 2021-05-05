import React, { useState } from "react";

const Comment = ({ list, parentId, handleRecommentSubmit }) => {
  const [openForm, setOpenForm] = useState(false);

  const [recommendForm, setRecommendForm] = useState("");

  const commentClick = () => {
    setOpenForm(!openForm);
  };

  const handleChange = (e) => {
    setRecommendForm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRecommentSubmit(list.id, recommendForm);
  };
  return (
    <React.Fragment>
      <li
        style={{ listStyle: "none", paddingLeft: parentId ? "100px" : "0px" }}
      >
        <div>
          <span>{list.content}</span>
          {parentId ? null : <button onClick={commentClick}>댓글달기</button>}
          <button>수정</button>
          <button>삭제</button>
        </div>
        {openForm && (
          <form onSubmit={handleSubmit}>
            <div style={{ marginLeft: "30px" }}>
              <textarea onChange={handleChange} value={recommendForm} />
              <button>등록</button>
            </div>
          </form>
        )}
      </li>
      {list.comments ? (
        <div>
          <ul>
            {list.comments.map((relist) => (
              <Comment
                list={relist}
                parentId={list.id}
                key={`reComment-${relist.id}`}
              />
              // <li style={{ marginLeft: "30px", listStyle: "none" }}>
              //   <div>
              //     <span>{relist.content}</span>
              //     <button>수정</button>
              //     <button>삭제</button>
              //   </div>
              // </li>
            ))}
          </ul>
        </div>
      ) : null}
    </React.Fragment>
  );
};
export default Comment;
