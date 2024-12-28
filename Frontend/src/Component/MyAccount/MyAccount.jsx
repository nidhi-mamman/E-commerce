import { useRef, useState } from 'react'
import axios from "axios"
import './MyAccount.css'
import { useContext } from 'react'
import { shopContext } from './../../Context/ContextProvider';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import eyebrow from '../../assets/eyebrow.png'
import eye from '../../assets/eye.png'

const MyAccount = () => {
    const [signupMode, setsignupMode] = useState(false)
    const [signupMode2, setsignupMode2] = useState(false)
    const [isVisible, setisVisible] = useState(false)
    const [ispassVisible, setispassVisible] = useState(false)
    const { BASE_URL, setToken } = useContext(shopContext)
    const containerRef = useRef(null)
    const navigate = useNavigate()
    const signupRef = useRef()
    const signinRef = useRef()


    const handleSignUpClick = () => {
        setsignupMode(true);
    };

    const handleSignInClick = () => {
        setsignupMode(false);
    };

    const handleSignUpClick2 = () => {
        setsignupMode2(true);
    };

    const handleSignInClick2 = () => {
        setsignupMode2(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        let form = new FormData(signupRef.current)
        let formData = {}
        for (let [key, value] of form.entries()) {
            formData[key] = value
        }
        const { name, email, password } = formData
        // regex
        const namePattern = /^[A-Za-z]+(\s[A-Za-z]+)*$/;
        const emailPattern = /^[a-zA-Z0-9._]+@(gmail\.com|yahoo\.com)$/;
        const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,12}$/;

        if (name.length === 0 || !namePattern.test(name)) {
            toast("Please enter your name and it must only contain letters.")
            return;
        }
        if (email.length === 0 || !emailPattern.test(email)) {
            toast("Please enter your email and it should be in correct format.")
            return;
        }
        if (password.length === 0 || !passwordPattern.test(password)) {
            toast("Please enter the password and it should be a number-letter mix upto 12 characters are allowed.")
            return;
        }
        try {
            const response = await axios.post(`${BASE_URL}/signup`, formData)
            if (response.status === 201) {
                toast.success("Signed up successfully.Now Signin with your credentials.")
                signupRef.current.reset()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleSignIn = async (e) => {
        e.preventDefault();
        let form = new FormData(signinRef.current)
        let formData = {}
        for (let [key, value] of form.entries()) {
            formData[key] = value
        }
        const { email, password } = formData

        const emailPattern = /^[a-zA-Z0-9._]+@(gmail\.com|yahoo\.com)$/;
        const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,12}$/

        if (email.length === 0) {
            toast("Please enter your email");
            return;
        }
        if (!emailPattern.test(email)) {
            toast("Email should be in correct format (example:xyz123@gmail.com");
            return;
        }
        if (password.length === 0) {
            toast("Please enter your password ");
            return;
        }
        if (!passwordPattern.test(password)) {
            toast("Password must have atleast 8 to 12 letters and it should be num-letter mix and a special symbol.");
            return;
        }

        try {
            const user = await axios.post(`${BASE_URL}/signin`, formData)
            localStorage.setItem('user', user.data.token)
            setToken(user.data.token)
            if (user.status === 200) {
                toast.success("SignedIn successfully")
                navigate('/')
            }

        } catch (error) {

            if (error.response && error.response.status === 400) {
                toast.error("Invalid Email or password");
            } else {
                toast.error("An error occurred. Please try again.");
                console.error("Error details:", error);
            }
        }
    }

    return (
        <>
            <div className='container'>
                <div ref={containerRef} className={`container-fluid ${signupMode ? "sign-up-mode" : ""} ${signupMode2 ? "sign-up-mode-2" : ""}`}>
                    <div className="signin">
                        <form method="POST" ref={signinRef} onSubmit={handleSignIn}>
                            <h1>Sign in</h1>
                            <p>or use your account</p>
                            <input type="email" name='email' placeholder="Email" required />
                            <div className="secure">
                                <input type={`${isVisible ? 'text' : 'password'}`} name='password' placeholder="Password" className='passw' maxLength={12} required />
                                {
                                    isVisible ?
                                        <img src={eye} className='eye cursor-pointer' alt="Eye Open" width={25} height={20} onClick={() => setisVisible(!isVisible)} />
                                        :
                                        <img src={eyebrow} className='eyeclose cursor-pointer' alt="Eye Close" width={25} height={20} onClick={() => setisVisible(!isVisible)} />

                                }
                            </div>
                            <p><Link to='/forgetpass'>Forgot your  password?</Link></p>
                            <p className='account-txt'>Do not have account ? <span className='text-blue-600 cursor-pointer' onClick={handleSignUpClick2}>Sign up</span></p>
                            <button type='submit'>SIGN IN</button>
                        </form>
                    </div>
                    <div className="signup">
                        <form method="POST" ref={signupRef} onSubmit={handleSubmit}>
                            <h1>Create Account</h1>
                            <p>or use your email for registration</p>
                            <input type="text" name="name" placeholder="Name" required />
                            <input type="email" name="email" placeholder="Email" required />
                            <div className="secure">
                                <input type={`${ispassVisible ? 'text' : 'password'}`} name='password' placeholder="Password" className='passw' maxLength={12} required />
                                {
                                    ispassVisible ?
                                        <img src={eye} className='eye cursor-pointer' alt="Eye Open" width={25} height={20} onClick={() => setispassVisible(!ispassVisible)} />
                                        :
                                        <img src={eyebrow} className='eyeclose cursor-pointer' alt="Eye Close" width={25} height={20} onClick={() => setispassVisible(!ispassVisible)} />

                                }
                            </div>
                            <p className='account-txt'>Do you already have an account ? <span className='text-blue-600 cursor-pointer' onClick={handleSignInClick2}>Sign in</span></p>
                            <button type='submit'>SIGN UP</button>
                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay overlay-left">
                            <div className="content">
                                <h1>Welcome Back!</h1>
                                <p>To keep connected with us please login with your personal info</p>
                                <button id="signin" onClick={handleSignInClick}>SIGN IN</button>
                            </div>
                        </div>
                        <div className="overlay overlay-right">
                            <div className="content">
                                <h1>Hello Friend!</h1>
                                <p>Enter your personal details and start journey with us</p>
                                <button id="signup" onClick={handleSignUpClick}>SIGN UP</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyAccount