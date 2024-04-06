'use client'

import Container from '@/components/layout/Container';
import EventSelect from '@/components/common/EventSelect';
import VersionButtons from '@/components/home/VersionButtons';
import ImageList from '@/components/home/ImageList';
import Footer from '@/components/home/Footer';

export default function Home() {

  return (
    <Container>
      <div className='flex justify-center mt-20'>
        <div className='w-96'>
          <EventSelect />

          <div className='mt-10 gap-2'>
            <VersionButtons />
            <ImageList />
          </div>
        </div>
      </div>

      <Footer />
    </Container>

  );
}
