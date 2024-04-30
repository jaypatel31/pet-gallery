// Navbar.js

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

const Container = styled.nav`
  background-color: #333;
  padding: 10px 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 16px;
  margin-right: 20px;
  transition: color 0.3s ease;

  &:hover {
    color: #ffcc00;
  }
`;

const Navbar = () => {
  return (
    <Container>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About Me</NavLink>
    </Container>
  );
};

export default Navbar;
