import React from "react";
import "./Header.scss";

export interface Link {
  title: string;
  url: string;
}
export interface HeaderProps {
  logo?: string;
  logoText?: string;
  links: Link[];
}

const Header: React.FC<HeaderProps> = ({ logo, logoText, links }) => {
  return (
    <header className="header">
      {logo ? (
        <img src={logo} alt="logo" className="logo" />
      ) : (
        <h1 className="logo">{logoText || "Logo"}</h1>
      )}
      <nav>
        <ul className="navList">
          {links.map((link) => (
            <li key={link.title} className="navItem">
              <a href={link.url}>{link.title}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
