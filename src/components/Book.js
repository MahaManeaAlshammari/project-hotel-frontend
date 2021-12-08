import React from 'react'
import {useParams , Link} from 'react-router-dom';

export default function Book() {
    const { id }= useParams()

    

    return (
        <div>
            <h1>{id}</h1>
        </div>
    )
}
