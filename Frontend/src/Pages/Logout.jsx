import { useEffect, useContext } from "react"
import { Navigate } from "react-router-dom"
import { shopContext } from "../Context/ContextProvider"
const Logout = () => {
    const { LogoutUser } = useContext(shopContext)

    useEffect(() => {
        LogoutUser()
    }, [LogoutUser])
    return (
        < Navigate to='/myAcc' />
    )
}

export default Logout