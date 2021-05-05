import React, { useState } from "react";
import shortId from "shortid";

import ReTodo from "./jisu/todoList";
import "./App.css";

function App() {
  const [todoForm, setTodoForm] = useState("");
  console.log(todoForm);

  const [todoList, setTodoList] = useState([]);
  console.log(todoList);

  const [openIndex, setOpenIndex] = useState("");
  console.log(openIndex);

  const [editForm, setEditForm] = useState("");

  const handleChange = (e) => {
    setTodoForm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setTodoList(todoForm);
    // setTodoForm("");

    const copy = [...todoList];
    const data = {
      id: shortId.generate(),
      content: todoForm,
    };

    // copy.push(todoForm);
    copy.push(data);
    setTodoList(copy);
    setTodoForm("");
  };

  // 수정handleChange
  const editChange = (e) => {
    setEditForm(e.target.value);
  };

  // 수정버튼
  const editButton = (id, content) => {
    setOpenIndex(id);
    setEditForm(content);
  };

  // 저장 버튼
  const saveButton = () => {
    const newList = [...todoList];
    console.log(newList);

    const updateIndex = newList.findIndex((list) => list.id === openIndex);
    const updateTodo = {
      ...newList[updateIndex],
      content: editForm,
    };

    newList.splice(updateIndex, 1, updateTodo);
    setTodoList(newList);
    setOpenIndex("");
    // setEditForm(editForm);
  };

  // 삭제버튼
  const deleteButton = (id) => {
    const newList = [...todoList];
    const updateIndex = newList.findIndex((list) => list.id === id);
    newList.splice(updateIndex, 1);
    setTodoList(newList);
  };

  // 취소버튼
  const cancelButton = () => {
    setOpenIndex("");
  };

  return (
    <div className="todo_Wrap">
      <div className="todo_form">
        <form onSubmit={handleSubmit}>
          <h1>Todo</h1>
          <textarea
            placeholder="댓글을 입력해주세요"
            onChange={handleChange}
            value={todoForm}
            name="todoForm"
          />
          <button type="submit">등록</button>
        </form>
      </div>
      <div className="todo_list">
        {todoList.map((list) => (
          <li key={list.id}>
            {openIndex === list.id ? (
              <>
                <textarea
                  onChange={editChange}
                  value={editForm}
                  name="editForm"
                />

                <button type="button" onClick={saveButton}>
                  저장
                </button>
                <button type="button" onClick={cancelButton}>
                  취소
                </button>
              </>
            ) : (
              <>
                <span>{list.content}</span>
                <button
                  type="button"
                  onClick={() => editButton(list.id, list.content)}
                >
                  수정
                </button>
                <button type="button" onClick={() => deleteButton(list.id)}>
                  삭제
                </button>
              </>
            )}
          </li>
        ))}
      </div>
      <ReTodo />
    </div>
  );
}

export default App;
