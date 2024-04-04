'use client'

import Container from '@/components/layout/Container';
import EventSelect from '@/components/common/EventSelect';
import { useState } from 'react'

const options = [
  { value: '64fe366b7c6fc458c573dd6f', label: 'Paris 2024' },
  { value: '64ff1ac8e550e5f85b048652', label: 'Kitty 2024' },
  { value: '621259f788353f9b409d9cbf', label: 'Misc 2024' }
]

const image = {
  year: '2023',
  imageID: 'i230001',
  name: '2023_paris_main_i230004_1d5066c8-192c-48a8-a0e9-7200712f47c2.jpg'
}

export default function Home() {

  const [event, setEvent] = useState(options[1].value);
  const [version, setVersion] = useState('main');

  const onVersionButtonChange = (e) => {
    setVersion(e)
  }

  const onEventChange = (e) => {
    setEvent(e)
  }

  return (
    <Container>
      <div className='flex justify-center mt-20'>
        <div className='w-96'>
          <EventSelect options={options} onEventChange={onEventChange} />
        </div>
      </div>

    </Container>

  );
}
