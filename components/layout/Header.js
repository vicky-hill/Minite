'use client'

import { useContext } from 'react'
import UserContext from '@/context/UserContext'


const Header = ({ }) => {
    const { currentUser } = useContext(UserContext);

    return (
        <div className='w-full h-12 shadow-md bg-white text-center py-2 px-10 flex items-center justify-between'>
            <Logo /> 
        </div>
    )
}

export default Header;
