'use client'

import Container from '@/components/layout/Container';
import EventSelect from '@/components/common/EventSelect';
import { useState } from 'react'
import VersionButtons from '@/components/home/VersionButtons';
import ImageList from '@/components/home/ImageList';
import Footer from '@/components/home/Footer';

const image = {
  year: '2023',
  imageID: 'i230001',
  name: '2023_paris_main_i230004_1d5066c8-192c-48a8-a0e9-7200712f47c2.jpg'
}

const images = [
  image,
  image,
  image,
  image,
  image,
  image,
  image,
  image,
  image,
  image,
]

export default function Home() {

  const [version, setVersion] = useState('main');

  const onVersionButtonChange = (e) => {
    setVersion(e)
  }

  return (
    <Container>
      <div className='flex justify-center mt-20'>
        <div className='w-96'>
          <EventSelect />

          <div className='mt-10 gap-2'>
            <VersionButtons active={version} onChange={onVersionButtonChange} />
            <ImageList />
          </div>
        </div>
      </div>

      <Footer />
    </Container>

  );
}
