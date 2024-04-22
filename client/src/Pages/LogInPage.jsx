import React from 'react';
import Loginform from '../Components/LoginForm';

const LogInPage = ({userInfo}) => {
    return (
        <>
           {<Loginform userInfo={userInfo} />}
        </>
    );
};

export default LogInPage;