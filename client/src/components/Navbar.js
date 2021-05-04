import React, { useState, useEffect } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; 
import 'tippy.js/themes/light.css';
import { useHistory, useLocation, Link } from 'react-router-dom';
import decode from 'jwt-decode';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Avatar, Button } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { AccountCircleOutlined, HomeOutlined, LockOpenOutlined } from '@material-ui/icons'
import * as FaIcons from 'react-icons/fa';

import useStyles  from './navbarStyle';
import './navbar.css'
import { light } from '@material-ui/core/styles/createPalette';


export default function Navbar() {
  const history = useHistory();  
  const classes = useStyles();
  const location = useLocation();

  const [user, setUser] = useState(localStorage.getItem('authToken'));
  const [visible, setVisible] = useState(false);
  const [userEmail, setUserEmail] = useState('')
  // console.log('user:',user);
  
  
  useEffect(() => {
    const decodedUser = decode(user);
    setUser(decodedUser);
    console.log('decoded user',user);
    console.log('decoded token nav', decodedUser.email);
    const tokenExp = decodedUser.exp * 1000;
    const currentTime= new Date().getTime();
    const expTimeRemaining = ((tokenExp - currentTime ) / 1000)/60;
    if (tokenExp < currentTime) {
      console.log("token expire:" ,tokenExp) 
      console.log("current time:" ,currentTime)
      console.log("time remaining:" ,expTimeRemaining)
      logout()
    }
    setUser(decodedUser.fn + ' ' + decodedUser.ln);
    setUserEmail(decodedUser.email)
    
  }, [])

  const logout = () => {
    localStorage.removeItem("authToken");
      history.push("/login");
  }

  const showProfile= () => {
    setVisible(!visible);
  }


  return (
//     <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
//       <div className="container-fluid">
//         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <Link className="navbar-brand" to="/">Code Stack</Link>
//         <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
//           <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
//             <li className="nav-item">
//               <Link className="nav-link active" aria-current="page" href="#">{ user }</Link>
//             </li>
//             <li className="nav-item">
//               <Tippy 
//                 visible={visible} 
//                 theme={'light'}
//                 placement={'bottom'}  
//                 interactive={true} 
//                 allowHTML={true}
//                 content={
//                   <>
//                   <div className="d-flex flex-md-column pt-3">
//                     <h4 className="m-2 user-profile">{user}</h4>
//                     <h5 className="m-2 user-profile text-muted">{ userEmail }</h5>
//                   </div>
//                     <hr className="dark:border-gray-900 mb-0"/>
//                     <div className='d-flex flex-md-column mb-3 align-content-start'>
//                         <Link to="/" className=" items-center mb-2">
//                           <span>
//                           <HomeOutlined className="m-2">Home</HomeOutlined>
//                           </span>Home
//                         </Link>
//                         <Link to="/" className="items-center mb-2"><span>
//                           <AccountCircleOutlined className="m-2"></AccountCircleOutlined>
//                           </span>Profile
//                         </Link>
//                         <Link to="/" className="items-center mb-1"><span>
//                           <LockOpenOutlined className="m-2"></LockOpenOutlined>
//                           </span>Setting
//                         </Link>
//                     </div>
//                     <hr className="dark:border-gray-900 mb-3"/>
//                     <Button onClick={logout} variant="outlined" fullWidth  className="primary mb-2">
//                       <Link>Logout</Link>
//                     </Button>
//                   </>
//                 }
//               >
//                 <Avatar onClick={showProfile} className="text">{user ? user.toUpperCase().charAt(0) : null}</Avatar>
//               </Tippy>
//             </li>
          
//           </ul>
//         </div>
//       </div>
// </nav>

    <div className="main-content">
      <header>
        <div className="header-title">
            <label htmlFor="">
                <span className>
                    <FaIcons.FaBars />
                </span> Dashboard
            </label>
        </div>
        <div className="search-wrapper">
            <span>
            <FaIcons.FaSearch />
            </span>
            <input type="search" placeholder="Search here"/>
        </div>
        <div className="user-wrapper">
            <Avatar onClick={showProfile} className="text">{user ? user.toUpperCase().charAt(0) : null}</Avatar>
            <div className="user-detail">
                <h5>John Doe</h5>
                <small>Super Admin</small>
            </div>
        </div>
      </header>

      <main className="main-section">
        <div className="cards">
            <div className="card-single">
                <div>
                    <h1>54</h1>
                    <span>Students</span>
                </div>
                <div>
                    <span>
                        <FaIcons.FaUsers />
                    </span>
                </div>
            </div>
            <div className="card-single">
                <div>
                    <h1>154</h1>
                    <span>Projects</span>
                </div>
                <div>
                    <span>
                        <FaIcons.FaClipboard />
                    </span>
                </div>
            </div>
            <div className="card-single">
                <div>
                    <h1>4</h1>
                    <span>New Tasks</span>
                </div>
                <div>
                    <span>
                        <FaIcons.FaLockOpen />
                    </span>
                </div>
            </div>
            <div className="card-single">
                <div>
                    <h1>4</h1>
                    <span>Pending Tasks</span>
                </div>
                <div>
                    <span>
                        <FaIcons.FaLockOpen />
                    </span>
                </div>
            </div>
        </div>
        
            <div className="recent-grid">
                <div className="projects">
                    <div className="card">
                        <div className="card-header">
                            <h2>Recent Projects</h2>
                            <button>See all 
                                <span>
                                    <FaIcons.FaArrowRight />
                                </span>
                            </button>
                        </div>
                    <div className="card-body">
                        <table width="100%">
                            <thead>
                                <tr>
                                    <td>Project Title</td>
                                    <td>Department</td>
                                    <td>Status</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>UI/UX Design</td>
                                    <td>UI Team</td>
                                    <td>
                                        <spa className="status"></spa>
                                        Review
                                    </td>
                                </tr>
                                <tr>
                                    <td>Web Design</td>
                                    <td>Frontend Team</td>
                                    <td>
                                        <spa className="status"></spa>
                                        Pemding
                                    </td>
                                </tr>
                                <tr>
                                    <td>Api</td>
                                    <td>Backend Team</td>
                                    <td>
                                        <spa className="status"></spa>
                                        In progress
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="customer">
                <div className="card">
                    <div className="card-header">
                        <h3>New Customer</h3>
                        <button>See All 
                            <span>
                            <FaIcons.FaArrowRight />
                            </span>
                        </button>
                    </div>
                    <div className="card-body">
                        <div className="customer">
                            <Avatar onClick={showProfile} className="text">{user ? user.toUpperCase().charAt(0) : null}</Avatar>
                            <div>
                                <h4>John Doe</h4>
                                <small>CEO Exer</small>
                            </div>
                        </div>
                    </div>
                    <span> <FaIcons.FaUserCircle /> </span>
                    <span> <FaIcons.FaComment /> </span>
                    <span> <FaIcons.FaPhone /> </span>
                </div>
            </div>
        </div>
            
      </main>
    </div>
  )

  }
