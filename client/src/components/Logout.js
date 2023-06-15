import React from 'react';
import { AppContext } from '../App';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();
    const { isTokenExist, setIsTokenExist } = useContext(AppContext);
    setIsTokenExist(false);

    localStorage.removeItem("aniflix_token");
    localStorage.removeItem("aniflix_username");

    if ( isTokenExist === false ) {
        setTimeout(() => {
            navigate('/');
        }, 500);
    }

return (
        <> 
        </>
    );
};

export default Logout;
