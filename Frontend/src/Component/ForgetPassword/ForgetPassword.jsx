import { toast } from 'react-toastify';
import './ForgetPassword.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useContext, useState } from 'react';
import { shopContext } from './../../Context/ContextProvider';

const ForgetPassword = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const { BASE_URL } = useContext(shopContext)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailPattern = /^[a-zA-Z0-9._]+@(gmail\.com|yahoo\.com)$/;

        if (!email || !emailPattern.test(email)) {
            return toast("Please enter a valid email (e.g., xyz123@gmail.com)");
        }

        try {
            const response = await axios.post(
                `${BASE_URL}/send-otp`,
                { email },
                { headers: { "Content-Type": "application/json" } }
            );
            if (response.status === 200) {
                toast(`Otp sent successfully`);
                navigate('/resetpass')
            }
        } catch (error) {
            toast.error("Error sending OTP:", error);
        }
    };

    return (
        <div className='forgetpasscontainer'>
            <div className="form-area">
                <form method='POST' onSubmit={handleSubmit} className='forget-form'>
                    <h1 className='text-blue-950'>Forgot Password</h1>
                    <input type="email" value={email} name="email" placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} className='form-input' />
                    <button type='submit' className='sendotp'>Send OTP</button>
                    <Link to='/myAcc' className='text-blue-950'>Sign In</Link>
                </form>
            </div>
        </div>
    )
}

export default ForgetPassword