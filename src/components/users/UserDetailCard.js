import React, {Component} from 'react';
import { Link, NavLink } from 'react-router-dom';

const UserDetailCard = (props) => {
    const {user} = props;
    return(
        <div>
            <div className='row'>
                <div className='col-md-6'>
                    <p>
                        <small>Name - </small>
                        {user.name}
                    </p>
                </div>
                <div className='col-md-6 d-flex justify-content-end'>
                    <Link to={{
                            pathname: '/users/edit',
                            state: {
                            user: user
                            }
                        }}> Edit </Link>                                               
                </div>
            </div>

            <p>
                <small>Email - </small>
                {user.email}
            </p>

            <p>
                <small>Currency - </small>
                {user.currency}
            </p>

            <p>
                <small>Mobile No - </small>
                {user.phone_number}
            </p>
        </div>
    );
};

export default UserDetailCard;