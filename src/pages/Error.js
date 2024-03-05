import { useRouteError } from 'react-router-dom';
import Header from '../components/Header';

function ErrorPage() {
    const { status, data } = useRouteError();
    const message =
        status === 500 ? data.message :
        status === 404 ? 'Could not find resource or page.' :
        'Something went wrong!';

    return (
        <>
            <Header />
            <main className={`flex justify-center items-center text-white h-2/3 text-3xl`}>
                <h1>{message}</h1>
            </main>
        </>
    );
}

export default ErrorPage;