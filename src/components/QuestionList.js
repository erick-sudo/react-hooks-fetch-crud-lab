import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({questions , deleteQuestion, updateQuestion}) {
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{
        questions.map(question => <QuestionItem updateQuestion={updateQuestion} key={question.id} deleteQuestion={deleteQuestion} question={question} />)
      }
      </ul>
    </section>
  );
}

export default QuestionList;
