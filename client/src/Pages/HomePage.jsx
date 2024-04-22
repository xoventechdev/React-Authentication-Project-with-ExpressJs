import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = ({userEmail, handleLogout}) => {

    const [response, setResponse] = useState('');

    useEffect( () => {
        

        takeData();

    },[])


    const takeData = async () => {
        const res = await axios.post('http://localhost:2222/api/v1/user_login');
        setResponse(res.data.response)
    }





    return (
        <div>
            <h2>Is this Home page?</h2>
            <h2>Welcome, {userEmail}</h2>
            <h3>{response}</h3>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    );
};

export default HomePage;