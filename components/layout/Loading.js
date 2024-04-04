'use client'

import { Skeleton } from 'antd'

export default function Loading({ error }) {

    return (
        <div>
            {error ? error?.response?.data?.message : (
                <>
                    <Skeleton.Button style={{ width: 170 }} className='ml-6 mb-7 w-96' active size="default" block={false}/>
                    
                    <Skeleton className='ml-12 w-[40vw]' active />
                    <Skeleton className='ml-12 mt-16 w-[40vw]' active />
                    <Skeleton className='ml-12 mt-16 w-[40vw]' active />
                </>
            )}
        </div>
    )
}