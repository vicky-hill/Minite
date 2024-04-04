import React from 'react'
import ImageListItem from './ImageListItem';

const ImageList = ({ images }) => {

    return (
        <div className='mt-20 h-[60vh] overflow-scroll'>
            {
                images.map(image => (
                    <ImageListItem key={image._id} image={image} />
                ))
            }
        </div>
    )
}

export default ImageList;
