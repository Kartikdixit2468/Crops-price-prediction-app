import React from "react";

function Header() {
  return (
    <header className="top-header">
      <div className="greeting">
        <h2>Good Morning, User</h2>
        <p>Hope you have a good day</p>
      </div>
      <div className="header-actions">
        <span className="material-icons">search</span>
        <span className="material-icons">notifications</span>
        <img src="/images/2021892.png" alt="Profile" className="profile-pic" />
      </div>
    </header>
  );
}

export default Header;
