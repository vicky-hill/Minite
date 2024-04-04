'use client'

import useQuery from '@/hooks/useQuery'
import React, { useEffect, useContext } from 'react'
import UserContext from '@/context/UserContext'
import { useRouter } from 'next/navigation'
import { Spin } from 'antd'

const Protect = ({ children }) => {
    const router = useRouter();
    const { path } = useQuery();

    const { currentUser, loading } = useContext(UserContext);

    useEffect(() => {
        if (!loading && !currentUser && path !== '/login' && path !== '/signup') {
            router.push('/login')
        }
    }, [currentUser, loading]);

    return (
        <div>
            {
                !currentUser && path !== '/login' && path !== '/signup' ? (
                    <div className='text-center mt-72'>
                        <Spin />
                    </div>
                ) : children
            }
        </div>
    )
}

export default Protect;