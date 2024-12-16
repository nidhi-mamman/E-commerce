import '../../CSS/Footer.css'
import { FaRegCopyright } from "react-icons/fa6";

const Footer = () => {
    return (
        <>
            <div className="footer">
                <p className='flex items-center justify-center gap-2'>All copyrights <FaRegCopyright />reserved</p>
            </div>
        </>
    )
}

export default Footer