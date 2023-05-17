import React from "react";
import { BsFillPatchMinusFill, BsFillPatchPlusFill } from "react-icons/bs";
import styles from "./styles.module.scss";

const Questions = ({ questions, product, setProduct }) => {
  const handleQuestions = (idx, e) => {
    const values = [...questions];
    values[idx][e.target.name] = e.target.value;
    setProduct({ ...product, questions: values });
  };

  const handleRemove = (idx) => {
    if (questions.length > 0) {
      const values = [...questions];
      values.splice(idx, 1);
      setProduct({ ...product, questions: values });
    }
  };

  return (
    <>
      <div className={styles.header}>Questions</div>
      {questions.length == 0 && (
        <div className={styles.questions}>
          Add new Questions
          <BsFillPatchPlusFill
            className={styles.svg}
            onClick={() => {
              setProduct({
                ...product,
                questions: [
                  ...questions,
                  {
                    question: "",
                    answer: "",
                  },
                ],
              });
            }}
          />
        </div>
      )}
      {questions
        ? questions.map((question, idx) => (
            <div className={styles.clickToAdd} key={idx}>
              <input
                type="text"
                name="question"
                placeholder="Questions"
                min={1}
                value={question.question}
                onChange={(e) => handleQuestions(idx, e)}
              />
              <input
                type="text"
                name="answer"
                placeholder="Answer"
                min={1}
                value={question.answer}
                onChange={(e) => handleQuestions(idx, e)}
              />

              <BsFillPatchMinusFill onClick={() => handleRemove(idx)} />
              <BsFillPatchPlusFill
                onClick={() => {
                  setProduct({
                    ...product,
                    questions: [
                      ...questions,
                      {
                        question: "",
                        answer: "",
                      },
                    ],
                  });
                }}
              />
            </div>
          ))
        : ""}
    </>
  );
};

export default Questions;
