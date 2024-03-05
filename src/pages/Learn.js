import { Await, Form, useLoaderData } from "react-router-dom";
import Button from "../components/UI/Button";
import { useState, useRef, useEffect } from "react";
import { GrStatusGood } from "react-icons/gr";
import { GrStatusCritical } from "react-icons/gr";
import gsap from "gsap";
import _ from 'lodash';


const LearnPage = () => {
    const { words } = useLoaderData();
    const numberInput = useRef();
    const answerRef = useRef();

    const [currentWord, setCurrentWord] = useState(false);
    const [isStarting, setIsStarting] = useState(false);
    const [answerStatus, setAnswerStatus] = useState('');

    useEffect(() => {
        if (answerStatus) {
            gsap.fromTo('#answerStatus', { y: 400, opacity: 0 }, { y: 0, opacity: 1 })
        }

    }, [answerStatus])

    useEffect(() => {
        // Перевірка, чи існує numberInput, щоб уникнути помилок
        if (numberInput.current) {
            numberInput.current.focus(); // Встановлення фокусу на елементі
        }
        gsap.fromTo('#maxButton', { x: -200 }, { x: 0 })
        gsap.fromTo('#startButton', { x: 200 }, { x: 0 })
        gsap.fromTo('#numberInput', { y: 200 }, { y: 0 })
    }, []);


    useEffect(() => {
        if (currentWord) {
            const timeline = gsap.timeline();
            timeline.fromTo('#startingForm', { x: '0', opacity: 1 }, { x: '50vh', opacity: 0 })
                .fromTo('#startingForm', { x: '-50vh', opacity: 0 }, { x: 0, opacity: 1 });
        }

    }, [currentWord])

    const maxValue = () => {
        numberInput.current.value = words.length
    }


    let answers = 0;
    let questions = 0;

    const startLearning = (e) => {
        e.preventDefault();
        if (!isStarting) {
            setIsStarting(true);
            const arrayForTest = [...words];
            const num = numberInput.current.value ? numberInput.current.value : words.length;

            const testingArr = _.shuffle(arrayForTest).slice(0, num);

            let currentIndex = 0;



            questions = testingArr.length;

            const nextIndex = () => {
                if (answerRef.current) {
                    answerRef.current.focus();
                }

                const answerInput = answerRef.current;

                if (answerInput) {

                    if (answerInput.value.toLowerCase() === testingArr[currentIndex - 1].ua.toLowerCase().replace('?', '')) {
                        answers++;
                        setAnswerStatus(
                            <GrStatusGood className="text-green-600" />
                        )

                    } else {
                        setAnswerStatus(<GrStatusCritical className="text-red-300" />)

                    }

                    answerInput.value = '';
                }



                if (currentIndex === testingArr.length) {
                    return endLearning();
                }


                const text = (
                    <Form className="flex flex-col gap-4 text-center max-sm:w-[90%]" id='startingForm'>
                        <p>{testingArr[currentIndex].eng}</p>
                        <input ref={answerRef} placeholder="translate" className="text-black"></input>
                        <Button onClick={nextIndex} type='submit'>Next</Button>
                        <Button onClick={endLearning} type='button'>Complete</Button>
                    </Form>
                )

                setCurrentWord(text)
                currentIndex++;
            }

            nextIndex();
            setTimeout(() => {
                if (answerRef.current) {
                    answerRef.current.focus();
                }
            }, 0);
        }
        else {
            return;
        }

    }


    const endLearning = () => {
        setAnswerStatus(
            false
        )
        gsap.fromTo('#learnSection', { y: 100 }, { y: 0 })
        const color = (answers * 100) / questions >= 75 ? 'green-500' : (answers * 100) / questions >= 50 ? 'white' : 'red-500';
        setCurrentWord(<div className={`border-${color} text-center shadow-xl p-4 border-2 rounded-xl`}>
            <p >Test is over: {answers} / {questions}</p>
            <p>{((answers * 100) / questions).toFixed(2)} %</p>
        </div>

        );
        setIsStarting(false);
    }



    return (
        <Await resolve={words}>
            <section className="flex flex-col w-full justify-center items-center h-auto gap-12" id='learnSection'>

                {currentWord &&
                    <div className="flex items-center justify-center flex-col" id='currentWordBlock'>
                        <div className=" w-full flex items-center justify-center text-[300%] pb-10" id='answerStatus'>
                            {answerStatus}

                        </div>
                        {currentWord}
                    </div>
                }
                {!isStarting &&

                    <form className="w-1/2 flex flex-col justify-center items-center gap-12" onSubmit={startLearning}>
                        <input placeholder="number of words"
                            id='numberInput'
                            className="text-black w-1/2 max-sm:w-full"
                            type="number"
                            min='1'
                            max={words.length}
                            ref={numberInput}>

                        </input>
                        <div className="flex gap-12 ">
                            <Button type='button' onClick={maxValue} id='maxButton'>Max</Button>
                            <Button type='submit' id='startButton'>Start</Button>
                        </div>
                    </form>
                }
            </section>
        </Await>

    )
}

export default LearnPage;
