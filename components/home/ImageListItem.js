'use client'

import Image from "next/image"
import Link from '@/next/Link'

const ImageListItem = ({ image }) => {

  return (
    <Link href={`/image/${image.imageID}`}>
      <div className='mt-3 text-center cursor-pointer'>
        <div className='relative w-28 h-28 rounded-md overflow-hidden mb-1'>
          <Image
            src={image.thumbnail}
            style={{ objectFit: 'cover', transform: 'scale(1.8)' }}
            alt={image.name}
            fill
          />
        </div>
        <span className='text-sm'>{image.imageID}</span>
      </div>
    </Link>
  )
}

export default ImageListItem;
