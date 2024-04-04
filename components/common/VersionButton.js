import React from 'react'

const VersionButton = ({ children, active, onClick }) => {
    const classNames = 'w-1/2 border rounded-lg py-2 text-center';
    const activeClassNames = 'bg-zinc-700 text-white'

    return (
        <div className={`${classNames} ${active ? activeClassNames : ''}`} onClick={() => onClick(children)}>
            { children }
        </div>
    )
}

export default VersionButton;
