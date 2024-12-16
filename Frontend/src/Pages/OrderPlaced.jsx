import '../CSS/CartItems.css'
import party from '../assets/popper.png'

const OrderPlaced = () => {
    return (
        <div className="flex items-center flex-col justify-center thankyou ">
            <img src={party} alt="" width={200} height={200}/>
            <h1 className='text-5xl font-bold text-blue-950'> Your Order Has been placed successfully</h1>
        </div>
    )
}

export default OrderPlaced