import React, { useContext } from 'react'
import ImageListItem from './ImageListItem';
import EventContext from '@/context/EventContext';

const ImageList = ({ }) => {

    const { event } = useContext(EventContext);

    if (!event) return;

    return (
        <div className='mt-20 h-[60vh] overflow-scroll'>
            {
                event.images.map(image => (
                    <ImageListItem key={image._id} image={image} />
                ))
            }
        </div>
    )
}

export default ImageList;
