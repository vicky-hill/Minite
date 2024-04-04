'use client'

import Link from '@/next/Link'

export default function Logo({ }) {

    return (
        <Link href='/'>
            <div className='flex items-center text-sky-300 font-bold tracking-wider cursor-pointer'>
                <span className='text-base'></span>
                {/* <div id="logo" className='h-7 w-7 relative mr-1'>
                    MINITE
                </div> */}
                <span className='logo text-xl'>Minite</span>
            </div>
        </Link>
    )
}