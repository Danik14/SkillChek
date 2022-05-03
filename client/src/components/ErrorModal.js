import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ErrorModal = ({ setShowModal, errorMessage }) => {

    let navigate = useNavigate()

    const handleClick = () => {
        setShowModal(false)
    }


    return (<div className="error-modal">
        <div className="close-icon" onClick={handleClick}> ✖ </div> <h2> Error </h2>
        <p> {errorMessage} </p>
        <button className="secondary-button" onClick={handleClick} >OK</button>
        <hr />
        <h2>Get the App </h2>
    </div>
    )
}
export default ErrorModal