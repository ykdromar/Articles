import React from "react";

function Navbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Articles | YK Dromar</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Login</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
