import { Outlet } from 'react-router-dom';

import Header from '../components/Header';

function RootLayout() {

  return (
    <>
      <Header />
      <main className='flex justify-center items-center h-full text-3xl pt-20 pb-10'>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;