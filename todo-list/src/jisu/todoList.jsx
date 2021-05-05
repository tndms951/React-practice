import React, { useState } from "react";
import shortId from "shortid";
import "./todoList.css";

const TodoList = () => {
  //  todoForm
  const [todoForm, setTodoForm] = useState("");
  const [todoList, setTodoList] = useState([]);

  // 수정 input open
  const [editInputOpen, setEditInputOpen] = useState(false);
  const [editForm, setEditForm] = useState("");

  console.log(todoForm);
  console.log(todoList);

  const hanldeSubmit = (e) => {
    e.preventDefault();
    // setTodoList(todoForm);

    const copy = [...todoList];
    const data = {
      id: shortId.generate(),
      content: todoForm,
    };

    copy.push(data);
    setTodoList(copy);
    setTodoForm("");
  };

  const handleChange = (e) => {
    setTodoForm(e.target.value);
  };

  // 수정버튼
  const editButton = (id, content) => {
    setEditInputOpen(id);
    setEditForm(content);
  };

  const editChange = (e) => {
    setEditForm(e.target.value);
  };

  // 저장버튼
  const saveButton = (id) => {
    const newList = [...todoList];
    const updateIndex = newList.findIndex((list) => list.id === id);
    const updateTodo = {
      ...newList[updateIndex],
      content: editForm,
    };
    newList.splice(updateIndex, 1, updateTodo);
    setTodoList(newList);
    setEditInputOpen("");
  };
  return (
    <>
      <div className="form">
        <form onSubmit={hanldeSubmit}>
          <h1 className="list">다시 Todo</h1>
          <textarea
            placeholder="내용을 입력해주세요"
            onChange={handleChange}
            value={todoForm}
            name="todoForm"
          />
          <button type="submit">등록</button>
        </form>
      </div>
      <div className="list_">
        {todoList.map((list) => (
          <li key={list.id}>
            <>
              {editInputOpen === list.id ? (
                <>
                  <textarea
                    onChange={editChange}
                    value={editForm}
                    name="editForm"
                  />
                  <button onClick={() => saveButton(list.id)}>저장</button>
                  <button>취소</button>
                </>
              ) : (
                <>
                  <span>{list.content}</span>
                  <button onClick={() => editButton(list.id, list.content)}>
                    수정
                  </button>
                  <button>삭제</button>
                </>
              )}
            </>
          </li>
        ))}
      </div>
    </>
  );
};

export default TodoList;
