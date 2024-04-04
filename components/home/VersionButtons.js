import VersionButton from "../common/VersionButton";

const VersionButtons = ({ active, onChange }) => {

    return (
        <>
            <div className='flex gap-3 mb-3'>
                <VersionButton onClick={onChange} active={active === 'Main'}>Main</VersionButton>
                <VersionButton onClick={onChange} active={active === 'Post'}>Post</VersionButton>
            </div>
            <div className='flex gap-3'>
                <VersionButton onClick={onChange}  active={active === 'Original'}>Original</VersionButton>
                <VersionButton onClick={onChange}  active={active === 'Alt'}>Alt</VersionButton>
            </div>
        </>
    )
}

export default VersionButtons;
