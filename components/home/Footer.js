import { Plus } from 'react-feather'
import Upload from '../common/Upload';

const Footer = ({ }) => {

    return (
        <div className='fixed bottom-0 left-0 right-0 h-20 bg-white shadow flex items-center justify-end'>
            <div className='h-12 w-12 mr-7 rounded-full flex items-center justify-center bg-slate-400'>
                {/* <Plus color='white' /> */}
                <Upload />
            </div>
        </div>
    )
}

export default Footer;
