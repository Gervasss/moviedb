import styled from '@emotion/styled';

type NavbarProps = {
  darkMode: boolean;  
};

export const Navbar = styled.div<NavbarProps>`

.Navbar{
 background-color: ${({ darkMode }) => (darkMode ? '#333' : '#fff')}; 
}

`;

