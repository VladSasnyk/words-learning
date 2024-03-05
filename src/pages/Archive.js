import { useLoaderData, Await } from "react-router-dom";
import axios from "axios";
import gsap from "gsap";
import { useEffect, useMemo } from "react";

const ArchivePage = () => {
    const { archiveWords } = useLoaderData();

    useEffect(() => {
        gsap.fromTo('#archive', { opacity: 0 }, { opacity: 1, duration: 1 })
    }, [])

    const memoizedArchiveWords = useMemo(() => {
        return archiveWords.length > 0 ? archiveWords : null;
    }, [archiveWords]);

    return (
        memoizedArchiveWords ?
            <Await resolve={memoizedArchiveWords}>
                <section id='archive' className="h-full flex flex-col justify-center items-center w-4/5 text-center gap-12 pt-8 max-sm:w-full">
                    <ul className="custom-scroll overflow-auto gap-6 flex flex-col w-full h-full">
                        {memoizedArchiveWords.map((el, i) => (
                            <li key={i} className='flex justify-center gap-12 w-full bg-neutral-300/20 rounded-full px-2'>
                                <p>{el.eng} - {el.ua}</p>
                            </li>
                        ))}
                    </ul>
                </section>
            </Await>
            :
            <p>No items</p>
    )
}

export default ArchivePage;

async function loadArchiveWords() {
    try {
        const { data } = await axios.get('https://words-learning-47b8c-default-rtdb.europe-west1.firebasedatabase.app/archive.json', {
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return Object.values(data);
    } catch (error) {
        console.error("Error fetching archive words:", error);
        return [];
    }
}

export async function loader() {
    const archiveWords = await loadArchiveWords();
    return { archiveWords };
}

