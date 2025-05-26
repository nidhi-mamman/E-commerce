import TextField from '@mui/material/TextField';
import '../CSS/Checkout.css'
import { useContext, useEffect, useState } from 'react';
import axios from 'axios'
import { useRef } from 'react';
import { toast } from 'react-toastify';
import { shopContext } from '../Context/ContextProvider';


const Checkout = () => {

    const formRef = useRef(null)
    const { getTotalAmount } = useContext(shopContext)
    const indianStates = [
        { name: "Andhra Pradesh" },
        { name: "Arunachal Pradesh" },
        { name: "Assam" },
        { name: "Bihar" },
        { name: "Chhattisgarh" },
        { name: "Goa" },
        { name: "Gujarat" },
        { name: "Haryana" },
        { name: "Himachal Pradesh" },
        { name: "Jharkhand" },
        { name: "Karnataka" },
        { name: "Kerala" },
        { name: "Madhya Pradesh" },
        { name: "Maharashtra" },
        { name: "Manipur" },
        { name: "Meghalaya" },
        { name: "Mizoram" },
        { name: "Nagaland" },
        { name: "Odisha" },
        { name: "Punjab" },
        { name: "Rajasthan" },
        { name: "Sikkim" },
        { name: "Tamil Nadu" },
        { name: "Telangana" },
        { name: "Tripura" },
        { name: "Uttar Pradesh" },
        { name: "Uttarakhand" },
        { name: "West Bengal" },
        { name: "Andaman and Nicobar Islands" },
        { name: "Chandigarh" },
        { name: "Dadra and Nagar Haveli and Daman and Diu" },
        { name: "Delhi" },
        { name: "Jammu & Kashmir" },
        { name: "Ladakh" },
        { name: "Lakshadweep" },
        { name: "Puducherry" }
    ];
    const [country, setCountry] = useState([])
    const [address, setAddress] = useState([])
    const [selectedCountry, setSelectedCountry] = useState('')
    const [selectedState, setSelectedState] = useState('')
    const [showContainer2, setShowContainer2] = useState(false)

    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all')
            .then((response) => {
                const countryOptions = response.data.map((country) => ({
                    value: country.cca2,
                    label: country.name.common,
                }));
                setCountry(countryOptions);
            });
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = new FormData(formRef.current)
        const formData = {}
        for (let [key, value] of form.entries()) {
            formData[key] = value
        }

        const { fullname, phonenumber, pincode, country, state, area, landmark, town } = formData;

        const namePattern = /^[A-Za-z]+(\s[A-Za-z]+)*$/;
        if (!namePattern.test(fullname) || fullname.length === 0) {
            return toast.error("Full name can only contain letters and it should not be empty.")
        }

        const mobilePattern = /^[0-9]{10}$/;
        if (!mobilePattern.test(phonenumber) || phonenumber.length === 0) {
            return toast.error("Phone number must contain 10 digits and it should not be empty.")
        }

        const pincodePattern = /^[0-9]{6}$/;
        if (!pincodePattern.test(pincode) || pincode.length === 0) {
            return toast.error("Pin code must contain 6 digits and it should not be empty.")
        }

        setAddress({
            fullname,
            phonenumber,
            country,
            state,
            area,
            landmark,
            town,
            pincode
        });

        setShowContainer2(true)

        formRef.current.reset()
        setSelectedCountry('')
        setSelectedState('')

    }
    return (
        <>
            <section className={`section ${showContainer2 ? 'hidden' : ''}`}>
                <div className={`container-checkout ${showContainer2 ? 'hidden' : ''}`}>
                    <form className='checkout-form' onSubmit={handleSubmit} ref={formRef}>
                        <h2 className='font-bold text-xl'>BILLING DETAILS</h2>
                        <div className="checkout-group1">
                            <TextField id="outlined-basic" label="Full Name" name='fullname' variant="outlined" size='small' required />
                            <select className='checkout-select' name='country' value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} required>
                                <option value="" disabled selected >
                                    Country/Region
                                </option>
                                {country.map((country) => (
                                    <option key={country.value} value={country.value}>
                                        {country.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="checkout-group1">
                            <TextField id="outlined-basic" label="Mobile Number" name='phonenumber' variant="outlined" size='small' required />
                            <TextField id="outlined-basic" label="House No./Street no./Area*" name='area' variant="outlined" size='small' required />
                        </div>
                        <div className="checkout-group1">
                            <TextField id="outlined-basic" label="Landmark" name="landmark" variant="outlined" size='small' required />
                            <TextField id="outlined-basic" label="6-digit PIN Code" name='pincode' variant="outlined" size='small' required />
                        </div>
                        <div className="checkout-group1">
                            <TextField id="outlined-basic" label="Town/City" name='town' variant="outlined" size='small' required />
                            <select className='checkout-select' name='state' value={selectedState} onChange={(e) => setSelectedState(e.target.value)} required>
                                <option value="" disabled selected>State</option>
                                {indianStates.map((state) => (
                                    <option key={state.name} value={state.name}>
                                        {state.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type='submit'>Submit</button>
                    </form>
                </div>
            </section>
            <div className={`deliver-container ${showContainer2 ? 'show' : 'hidden'}`}>
                {showContainer2 && (<div className="summary-container">
                    <div className="container2-checkout">
                        <div className="card deliveryto">
                            <div className="card-body">
                                <h2 className="card-title font-bold">Delivering to:</h2>
                                <p className="card-text">
                                    {address.fullname},<br />
                                    {address.phonenumber},<br />
                                    {address.area}, {address.landmark}, {address.town},<br />
                                    {address.state}, {address.country}, {address.pincode}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="container3-checkout">
                        <div className="card order-summary-card" >
                            <div className="card-body">
                                <h5 className="card-title font-bold ">ORDER SUMMARY</h5>
                                <p className="card-text flex items-center justify-between">
                                    <h2>Items:</h2>
                                    <span>---</span>
                                </p>
                                <p className="card-text flex items-center justify-between">
                                    <h2>Delivery:</h2>
                                    <span>---</span>
                                </p>
                                <p className='card-text flex items-center justify-between font-bold font-sans text-red-700'>
                                    <h2>ORDER TOTAL:</h2>
                                    <span>${getTotalAmount()}</span>
                                </p>
                                <button className='buy'>PROCEED TO BUY</button>
                            </div>
                        </div>
                    </div>
                </div>
                )}
            </div>
        </>
    )
}

export default Checkout