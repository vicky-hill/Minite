import Image from "next/image"

const ImageListItem = ({ image }) => {

    return (
        <div className='flex mt-3'>
        <div className='relative w-36 h-36 rounded-md overflow-hidden'>
          <Image
            src={image.thumbnail}
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
