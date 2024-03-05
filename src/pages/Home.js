import gsap from "gsap";
import { useEffect, useState } from "react";
import { useLoaderData, Await, Link } from "react-router-dom";
import ButtonMain from '../components/UI/Button'
// import axios from "axios";



const HomePage = () => {
    const { archiveWords } = useLoaderData();
    const [count, setCount] = useState(0);

    useEffect(() => {
        gsap.fromTo('#button-home', { opacity: 0, y: 100 }, { opacity: 1 , y: 0, duration: 1})
    }, [])



    useEffect(() => {
        const interval = setInterval(() => {
            if (count < archiveWords.length) {
                setCount(prevCount => prevCount + 1);
            }
        }, 10);

        return () => clearInterval(interval); // Прибираємо інтервал при розмонтуванні компонента
    }, [count, archiveWords]);

    return (

        <section className="flex flex-col gap-12 justify-center items-center w-full text-center max-sm:gap-16">
            <h1 id='home-title' className="text-5xl max-sm:text-4xl px-4">Ready to Expand Your Vocabulary? </h1>
            <Await resolve={archiveWords}>
                {archiveWords.length > 0 ?
                    <div className="border-b-2 border-white max-sm:text-xl">Already learned - {count} words.</div> :
                    <div className="border-b-2 border-white max-sm:text-xl">You have not yet started studying</div>}

            </Await>
            <Link to='/words' id='button-home'>
                <ButtonMain className='text-3xl'>
                    Let's get started
                </ButtonMain>
            </Link>
        </section>

    )


}




export default HomePage;


