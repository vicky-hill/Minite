'use client'

import { useContext } from 'react'
import EventContext from '@/context/EventContext'
import VersionButton from "../common/VersionButton"

const VersionButtons = ({ }) => {

    const { setSelectedVersion, selectedVersion } = useContext(EventContext);

    const onChange = (version) => {
        setSelectedVersion(version);
    }

    return (
        <>
            <div className='flex gap-3 mb-3'>
                <VersionButton onClick={onChange} active={selectedVersion === 'main'}>Main</VersionButton>
                <VersionButton onClick={onChange} active={selectedVersion === 'post'}>Post</VersionButton>
            </div>
            <div className='flex gap-3'>
                <VersionButton onClick={onChange}  active={selectedVersion === 'original'}>Original</VersionButton>
                <VersionButton onClick={onChange}  active={selectedVersion === 'alt'}>Alt</VersionButton>
            </div>
        </>
    )
}

export default VersionButtons;
