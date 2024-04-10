'use client'

import React, { useContext, useState, useEffect } from 'react'
import ImageListItem from './ImageListItem'
import EventContext from '@/context/EventContext'

const ImageList = ({ }) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
    
    }, [])

    const { event } = useContext(EventContext);

    if (!event) return;

    return (
        <div className='pb-56 flex flex-wrap justify-between mt-20 h-[60vh] overflow-scroll'>
            {
                event.images.map(image => (
                    <ImageListItem key={image._id} image={image} />
                ))
            }
        </div>
    )
}

export default ImageList;
