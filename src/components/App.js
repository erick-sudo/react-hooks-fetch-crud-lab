import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  function addQuestion(newQuestion) {
    setQuestions([...questions, newQuestion])
  }

  function deleteQuestion(questionId) {
    fetch(`http://localhost:4000/questions/${questionId}`,{
      method: "DELETE"
    })
    setQuestions(questions.filter(question => question.id!== questionId))
  }

  function updateQuestion(questionId, update) {
    fetch(`http://localhost:4000/questions/${questionId}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(update)
    })
    .then(response => response.json())
    .then(response => {
      setQuestions(questions.map(question => {
        if (question.id === questionId) {
          return response
        } else {
          return question
        }
      }))
    })
  }

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then(res => res.json())
    .then(data => setQuestions(data))
  },[])

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm addQuestion={addQuestion} /> : <QuestionList updateQuestion={updateQuestion} deleteQuestion={deleteQuestion} questions={questions}/>}
    </main>
  );
}

export default App;
