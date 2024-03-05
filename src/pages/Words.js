import { useEffect, useRef, useState } from "react";
import { useLoaderData, Await, Form, redirect } from "react-router-dom";
import Button from "../components/UI/Button";
import uaIcon from '../assets/ua.png';
import engIcon from '../assets/eng.png'
import { v4 as uuidv4 } from 'uuid';
import 'simplebar/dist/simplebar.min.css';
import axios from 'axios';
import gsap from "gsap";

const WordsPage = () => {
    const { words } = useLoaderData();
    const uaRef = useRef();
    const engRef = useRef();

    const [list, setList] = useState(words);

    useEffect(() => {
        gsap.fromTo('.wordsLi', { y: '-50', opacity: 0 }, { y: 0, opacity: 1, stagger: '.2', duration: .3 })

    }, [])


    const addWord = () => {
        if (uaRef.current.value === '') {
            translateText();
            return;
        }
        const id = uuidv4();
        const newWord = {
            ua: uaRef.current.value,
            eng: engRef.current.value,
            id: id
        }

        gsap.fromTo('#buttonAdd', { y: -20 }, { y: 0 })
        setList([...list, newWord]);
        uaRef.current.value = '';
        engRef.current.value = '';
        engRef.current.focus();
        return action(newWord, 'POST');
    }


    const deleteWord = async (id, list) => {
        const updatedList = list.filter((el) => el.id !== id);
        const deletedWord = list.find((el, i) => el.id === id);

        
        const wordToDelete = document.getElementById(`word-${id}`);
        if (wordToDelete) {
            gsap.to(wordToDelete, {
                opacity: 0, y: '-50', duration: .5, onComplete: () => {
                    setList(updatedList);

                }
            });
        } else {
            setList(updatedList);
        }

        await action(updatedList, 'PUT');
        await action(deletedWord, 'POST', 'https://words-learning-47b8c-default-rtdb.europe-west1.firebasedatabase.app/archive.json');
    }




    const translateText = async () => {
        const apiUrl = 'https://api.mymemory.translated.net/get';

        try {
            const response = await axios.get(apiUrl, {
                params: {
                    q: engRef.current.value,
                    langpair: 'en|uk',
                    key: 'a72fecd024dbe0abbf6e',
                },
            });

            const translation = response.data.responseData.translatedText;
            uaRef.current.value = translation.toLowerCase();
        } catch (error) {
            console.error('Error translating text:', error);
        }
    };


    return (
        <Await resolve={words}>
            <section className="h-full flex flex-col justify-center items-center w-4/5 text-center gap-12 pt-8 max-sm:w-full max-sm:gap-6">
                <ul className="custom-scroll overflow-auto gap-6 flex flex-col w-[90%] ">
                    {list.map((el) => (
                        <li key={el.id} className='wordsLi flex justify-center items-center gap-12 w-full bg-neutral-300/20 rounded-full py-3 px-4 text-lg' id={`word-${el.id}`}>
                            <p className="w-2/3">{el.eng} - {el.ua}</p>
                            <Form className="" onSubmit={deleteWord.bind(null, el.id, list)}>
                                <Button type='submit' className='text-lg max-sm:text-xs'>Learned</Button>
                            </Form>
                        </li>
                    ))}
                </ul>

                <Form onSubmit={addWord} className='flex flex-col items-center gap-12 w-[90%] max-sm:gap-6'>
                    <div className="flex gap-10 max-md:flex-col w-full items-center justify-center max-sm:gap-4">
                        <label htmlFor="engInput">
                            <div className="w-[5vw] max-sm:w-[10vw]">
                                <img src={engIcon} alt='ua' className="object-cover"></img>
                            </div>

                        </label>
                        <input type='text' id='engInput' ref={engRef} required className="text-black max-sm:w-full" />
                        <label htmlFor="uaInput">
                            <div className="w-[5vw] max-sm:w-[10vw]">
                                <img src={uaIcon} alt='ua' className="object-cover"></img>
                            </div>
                        </label>
                        <input type='text' id='uaInput' ref={uaRef} className="text-black max-sm:w-full" />
                    </div>
                    <Button type='submit' id='buttonAdd' className="w-[25%] text-lg max-sm:w-[60%]">Add</Button>
                </Form>
            </section>
        </Await>
    );
}

export default WordsPage;



export async function action(obj, method, url = 'https://words-learning-47b8c-default-rtdb.europe-west1.firebasedatabase.app/words.json') {
    try {
        await axios({
            method: method,
            url: url,
            data: obj,
            headers: {
                'Content-Type': 'application/json'
            },
        });

        return redirect('/words');
    } catch (error) {
        throw error;
    }
}

export async function loader() {
    try {
        const response = await axios.get('https://words-learning-47b8c-default-rtdb.europe-west1.firebasedatabase.app/words.json', {
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const words = Object.values(response.data);
        return { words };

    } catch (error) {
        const words = []
        return { words }
    }
}






