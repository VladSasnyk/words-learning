import { NavLink } from 'react-router-dom';
import headerIcon from '../assets/logo.png';
import ButtonMain from './UI/Button';
import HeaderNav from './HeaderNav'





const Header = () => {
    return <>
        <header className="flex bg-neutral-300/10 p-4 flex justify-around items-center shadow-xl fixed w-screen top-0 left-0 z-10">


            <NavLink to='/'><img src={headerIcon} className='h-10' alt='logo'></img></NavLink>
            <nav className="flex">

                <HeaderNav />

            </nav>

            <ButtonMain className='px-6'>LOGIN</ButtonMain>
        </header>
    </>
}


export default Header;