import Image from "next/image"

const ImageListItem = ({ image }) => {

    return (
        <div className='flex mt-3'>
        <div className='relative w-20 h-20 rounded-md overflow-hidden'>
          <Image
            src={image.url}
            style={{ objectFit: 'cover' }}
            alt={image.name}
            fill
          />
        </div>
        <span className='ml-5'>{image.imageID}</span>
      </div>
    )
}

export default ImageListItem;
