'use client'

import Container from '@/components/layout/Container'
import ImageContext from '@/context/ImageContext'
import { useEffect, useContext } from 'react'
import Image from "next/image"
import VersionButtons from '@/components/home/VersionButtons'
import Upload from '@/components/common/Upload'

export default function page({ params }) {
    const { imageID } = params;
    const { images, getImagesWithVersions } = useContext(ImageContext);

    useEffect(() => {
        getImagesWithVersions(imageID)
    }, [])

    if (!images) return;

    return (
        <Container className='px-48 pt-20'>
            <h1 className='text-3xl font-medium'>{imageID}</h1>
            <div className='mt-12 flex gap-4'>
                {
                    images.map(image => (
                        <div className='mt-3 text-center cursor-pointer'>
                            <div className='relative w-28 h-28 rounded-md overflow-hidden mb-1'>
                                <Image
                                    src={image.thumbnail}
                                    style={{ objectFit: 'cover', transform: 'scale(1.8)' }}
                                    alt={image.name}
                                    fill
                                />
                            </div>
                            <span className='text-sm'>{image.version}</span>
                        </div>
                    ))
                }
            </div>
            <div className='w-96 mt-20'>
                <VersionButtons />
                <div className='mt-12'>
                    <Upload imageID={imageID} />
                </div>
            </div>

        </Container>
    )
}