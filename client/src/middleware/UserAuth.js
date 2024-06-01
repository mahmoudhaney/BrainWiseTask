import React from 'react';
import {Outlet, Navigate} from 'react-router-dom';
import { getAuthUser } from '../helper/Storage';

const UserAuth = () => {
    const auth = getAuthUser();
    return <> { auth && auth.is_staff === false ? <Outlet /> : <Navigate to={"/"} />} </>;
};

export default UserAuth;