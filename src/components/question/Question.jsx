import { Button } from '@material-ui/core';
import { useState, useEffect } from 'react';
import db from '../../db';
import Overall from '../overall/Overall';
import '../question/question.css';

function Question() {
  const [increment, setIncrement] = useState(0);
  const [qaData, setQaData] = useState(db);
  const [ranNum, setRanNum] = useState(0);
  const [input, setInput] = useState('');
  const [answerClass, setAnswerClass] = useState('active');
  const [isFinal, setIsFinal] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const randomNum = Math.floor(Math.random() * qaData.length);
    setRanNum(randomNum);
    if (increment === db.length) {
      setIsFinal(true);
    }
  }, [increment, qaData.length]);

  const handleChoose = (elem) => {
    setInput(elem);
    setTimeout(() => {
      setAnswerClass(qaData[ranNum]?.answer === elem ? 'rightAnswer' : 'wrongAnswer');
      if (qaData[ranNum]?.answer === elem) {
        setScore(score + 1);
        setTimeout(() => {
          handleNext();
        }, 700);
      }
    }, 500);
    setAnswerClass('active');
  };

  const handleNext = () => {
    setIncrement(increment + 1);
    setInput(); // clean input state which gonna clean 'active'
    let withoutOne = qaData.filter((e, index) => ranNum !== index);
    setQaData(withoutOne);
  };

  return (
    <>
      {!isFinal ? (
        <div className="questionMain">
          <h4>Question : {increment + 1} </h4>
          <div>{qaData[ranNum]?.question}</div>
          <div className="answersSection">
            {qaData[ranNum]?.option.map((elem, index) => {
              return (
                <div
                  id={input === elem ? answerClass : ''}
                  onClick={() => handleChoose(elem)}
                  key={index}
                  className="answer">
                  {elem}
                </div>
              );
            })}
            <div className="picture">
              <img src={qaData[ranNum]?.link} alt="" />
            </div>
          </div>

          <Button
            onClick={handleNext}
            style={{ marginTop: '10px', height: '50px' }}
            fullWidth
            variant="contained"
            color="primary">
            Next
          </Button>
        </div>
      ) : (
        <Overall score={score} />
      )}
    </>
  );
}

export default Question;
