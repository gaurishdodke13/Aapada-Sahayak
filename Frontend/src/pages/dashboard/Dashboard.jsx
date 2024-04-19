import React from 'react';
import './Dashboards.css'
import Map from '../request/Map';

const Dashboard = ({ user }) => {

  return (
    <div className="container">
      <div className="left_sidebar">
        <div className="close_hamburger_btn">
          <i className='bx bx-x-circle'></i>
        </div>
        <div className="logo">
          <h2>Disaster Management</h2>
        </div>
        <div className="menu_items">
          <div className="menu_item">
            <i className='bx bxs-dashboard'></i>
            <p>Dashboard</p>
          </div>
          <div className="menu_item">
            <i className='bx bx-message-rounded-dots'></i>
            <p>Government </p>
            <i className="fa-regular fa-circle-2"></i>
          </div>
          <div className="menu_item ">
            <i className='bx bx-calendar'></i>
            <p>Rescue</p>
          </div>
          <div className="menu_item ">
            <i className='bx bx-file-blank'></i>
            <p>Database</p>
          </div>
          <div className="menu_item ">
            <i className='bx bx-signal-4'></i>
            <p>Find Agencies</p>
          </div>
          <div className="menu_item ">
            <i className='bx bx-cog'></i>
            <p>Settings</p>
          </div>
        </div>
      </div>
      <div className="main_content">
        <div className="left_right_sidebar_opener">
          <div className="hamburger">
            <i className='bx bx-menu'></i>
          </div>
          <div className="student">
            <div className="profile_img">
              <img src="https://i.postimg.cc/Sxb6gssQ/img-1.jpg" alt="profile img" />
            </div>
            <div className="profile_name">
              <p>Kery Roy</p>
            </div>
          </div>
        </div>
        <div className="main_navbar">
          <div className="search_box">
            <i className='bx bx-search-alt-2'></i> <input type="text " placeholder="Search" />
          </div>
          {/* <div className="dark_mode_icon">
            <i className='bx bx-moon'></i>
            <i className='bx bx-sun'></i>
          </div> */}
        </div>
        <div className="menu_item_name_and_filter ">
          <div className="menu_item_name">
            <h2>Database</h2>
          </div>
          <div className="filter_and_sort">
            <div className="sort sort_and_filter">
              <p>Sort</p>
              <i className='bx bx-sort-down'></i>
            </div>
            <div className="filter sort_and_filter">
              <p>Filter</p>
              <i className='bx bx-filter'></i>
            </div>
          </div>
        </div>
        <div className="tabs">
          <div className="tab_name">
            <p>Govt</p>
            <p>Rescue</p>
            <p>Admin</p>
          </div>
          <div className="three_dots">
            <i className='bx bx-dots-vertical-rounded'></i>
          </div>
        </div>
        <div className="table">
          <table>
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Class</th>
              <th>Disaster</th>
              <th>Invertory</th>
              <th>Email</th>
            </tr>
            <tr>
              <td className="profile_name"><img src="https://i.postimg.cc/c1bW8qWT/1656339664529.jpg" alt="img" /> Sanket
              </td>
              <td>012</td>
              <td>NGO</td>
              <td>Flood</td>
              <td>Get lost</td>
              <td>ngo@gmail.com</td>
            </tr> <tr>
              <td className="profile_name"><img src="https://i.postimg.cc/c1bW8qWT/1656339664529.jpg" alt="img" /> Sanket
              </td>
              <td>012</td>
              <td>NGO</td>
              <td>Flood</td>
              <td>Get lost</td>
              <td>ngo@gmail.com</td>
            </tr>
            <tr>
              <td className="profile_name"><img src="https://i.postimg.cc/c1bW8qWT/1656339664529.jpg" alt="img" /> Sanket
              </td>
              <td>012</td>
              <td>NGO</td>
              <td>Flood</td>
              <td>Get lost</td>
              <td>ngo@gmail.com</td>
            </tr>
            <tr>
              <td className="profile_name"><img src="https://i.postimg.cc/c1bW8qWT/1656339664529.jpg" alt="img" /> Sanket
              </td>
              <td>012</td>
              <td>NGO</td>
              <td>Flood</td>
              <td>Get lost</td>
              <td>ngo@gmail.com</td>
            </tr>
            <tr>
              <td className="profile_name"><img src="https://i.postimg.cc/c1bW8qWT/1656339664529.jpg" alt="img" /> Sanket
              </td>
              <td>012</td>
              <td>NGO</td>
              <td>Flood</td>
              <td>Get lost</td>
              <td>ngo@gmail.com</td>
            </tr>
            <tr>
              <td className="profile_name"><img src="https://i.postimg.cc/c1bW8qWT/1656339664529.jpg" alt="img" /> Sanket
              </td>
              <td>012</td>
              <td>NGO</td>
              <td>Flood</td>
              <td>Get lost</td>
              <td>ngo@gmail.com</td>
            </tr>
          </table>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;
