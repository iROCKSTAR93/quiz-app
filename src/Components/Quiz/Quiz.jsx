import React, { useEffect, useRef, useState } from 'react'
import './Quiz.css'
import axios from 'axios'
const Quiz = () => {
    const [data, setData] = useState([]);
    const [currentQuestion, setQuestion] = useState({});
    const [index, setIndex] = useState(0);
    const [lock, setLock] = useState(false);
    const [answers, setAnswers] = useState([0, 0, 0, 0]);
    const [score, setScore] = useState(0);
    const [isdisable, setdisable] = useState(true);

    const getdata = async () => {
        const response = await axios.get('https://quizapi.io/api/v1/questions?apiKey=9cOiQ7oEA6AiakUDiyajne3YgGKywt5sJMgFhCUW&limit=10&category=Linux');
        console.log(response.data);
        if (response.data) {
            setData(response.data);
        }
    }
    const nextQuestion = () => {
        setdisable(true);
        setIndex(index + 1);
        setLock(false);
        setAnswers([0, 0, 0, 0])

    }
    useEffect(() => {
        setQuestion(data[index]);
    }, [index, data]);
    useEffect(() => {
        getdata();
    }, []);
    const checkAns = (e, ans, d) => {
        if (lock) {
            return;
        }

        let tempanswer = answers;
        if (currentQuestion?.correct_answer == ans) {
            tempanswer[d - 1] = 1;
            setScore(score + 1);
        }
        else
            tempanswer[d - 1] = -1;

        if (currentQuestion?.correct_answer == "answer_a")
            tempanswer[0] = 1;
        else if (currentQuestion?.correct_answer == "answer_b")
            tempanswer[1] = 1;
        else if (currentQuestion?.correct_answer == "answer_c")
            tempanswer[2] = 1;
        else
            tempanswer[3] = 1;
        setAnswers(tempanswer);
        setLock(true);
        setdisable(false);

    }

    return (
        <>

            <h1 className='header'>Quiz</h1>{
                index == data.length ? <>
                    <h1 className='scoreHeader'>score is {score}</h1>
                </> :
                    <>
                        <div className='container'>
                            <h3>{index + 1}. {currentQuestion?.question}</h3>
                            <ul>
                                <li className={answers[0] == 0 ? " " : answers[0] == 1 ? "correct" : "wrong"} onClick={(e) => { checkAns(e, "answer_a", 1) }}>{currentQuestion?.answers?.answer_a}</li>
                                <li className={answers[1] == 0 ? " " : answers[1] == 1 ? "correct" : "wrong"} onClick={(e) => { checkAns(e, "answer_b", 2) }}>{currentQuestion?.answers?.answer_b}</li>
                                <li className={answers[2] == 0 ? " " : answers[2] == 1 ? "correct" : "wrong"} onClick={(e) => { checkAns(e, "answer_c", 3) }}>{currentQuestion?.answers?.answer_c}</li>
                                <li className={answers[3] == 0 ? " " : answers[3] == 1 ? "correct" : "wrong"} onClick={(e) => { checkAns(e, "answer_d", 4) }}>{currentQuestion?.answers?.answer_d}</li>
                            </ul>
                            <button onClick={nextQuestion} disabled={isdisable}>Next</button>
                            <div className='index'>{index + 1} of {data.length} questions</div>
                        </div>
                    </>
            }




        </>
    )
}

export default Quiz
