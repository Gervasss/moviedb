import styled from '@emotion/styled';

type NavbarProps = {
  darkMode: boolean;  
};

export const Navbar = styled.div<NavbarProps>`

.Navbar{
 background-color: ${({ darkMode }) => (darkMode ? '#333' : '#fff')}; 
}
.mobile-menu-list{
 background-color: ${({ darkMode }) => (darkMode ? '#333' : '#fff')}; 
 color: ${({ darkMode }) => (darkMode ? '#fff' : '#333')}; 
 

}
`;

