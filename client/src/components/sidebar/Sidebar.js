import React from 'react'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';

import './sidebar.css';

const Sidebar = () => {
    return (
        <>
            <div className="sidebar">
                <div className="sidebar-brand">
                    <h1><span></span>Code Stack</h1>
                </div>
                <div className="d-flex flex-md-column pt-3">
                        <h4 className="m-2 user-profile">Jane Doe</h4>
                        <h5 className="m-2 user-profile text-muted">Admin</h5>
                </div>
                <div className='nav-items'>
                    <ul>
                        <li>
                            <Link to="/" className="item mb-2 active">
                                <span>
                                    <AiIcons.AiOutlineHome className="mr-3 item-icon" />Home
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="item mb-2">
                                <span>
                                    <AiIcons.AiOutlineHome className="mr-3" />Projects
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className=" item mb-2">
                                <span>
                                    <AiIcons.AiOutlineHome className="mr-3" />Home
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className=" item mb-2">
                                <span>
                                    <AiIcons.AiOutlineHome className="mr-3" />Home
                                </span>
                            </Link>
                        </li>
                    </ul>
                   
                </div>
                    
            </div>
        </>
    )
}

export default Sidebar;
