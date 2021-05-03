import React from 'react'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';

import './sidebar.css';

const Sidebar = () => {
    return (
        <>
            <div className="sidebar">
                <div className="d-flex flex-md-column pt-3">
                        <h4 className="m-2 user-profile">Nashon</h4>
                        <h5 className="m-2 user-profile text-muted">Admin</h5>
                </div>
                <div className='d-flex flex-md-column mb-3 align-content-start'>
                    <Link to="/" className=" items-center mb-2">
                    <span>
                    <AiIcons.AiOutlineHome className="m-2" />Home
                    </span>
                    </Link>
                </div>
                    
            </div>
        </>
    )
}

export default Sidebar;
