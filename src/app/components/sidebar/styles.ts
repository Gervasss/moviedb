import styled from '@emotion/styled';

type SidebarProps = {
  darkMode: boolean;  
};

export const Sidebar = styled.div<SidebarProps>`
  width: 12%;
  height: 96%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  overflow: none;
  background-color: ${({ darkMode }) => (darkMode ? '#333' : '#fff')}; 
  color: ${({ darkMode }) => (darkMode ? 'white' : 'black')};  /* Cor do texto */
  transition: background-color 0.3s, color 0.3s; /* Transição suave para o tema */

  .switch {
    cursor: pointer;
    transition: 0.5s;
    &:hover {
      transform: scale(1.5);
    }
  }

  .icon-Sidebar {
    width: 18%;
    height: 80%;
    font-size: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .title-Sidebar {
    margin-left: 10px;
  }

  .top {
    width: 100%;
    height: 15%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    margin-left: -10%;
  }

  .admin-buttons {
    width: 100%;
    height: 60%;
    margin-top: 6%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid #e6e6e6;
  }

  .admin-buttons .buttons {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }

  .admin-buttons .buttons .sideButton {
    width: 100%;
    height: 14%;
    margin-right:14%;
    display: flex;
    font-size: 1rem;
    justify-content: space-between;
    align-items: center;
    border-radius: 0%;
    cursor: pointer;
    padding: 0 1rem;
    border: none;
    transition: all 0.4s ease-in-out;
    background-color: ${({ darkMode }) => (darkMode ? '#333' : '#fff')};  /* Cor de fundo dos botões */
    color: ${({ darkMode }) => (darkMode ? 'white' : 'black')};  /* Cor do texto dos botões */
    &:hover {
      background-color: ${({ darkMode }) => (darkMode ? '#4F4F4F' : '#e6e6e6')};  /* Hover dos botões */
      transform: scale(1.0);
    }
    
  }

  .user-container .user-container-2 {
    width: 100%;
    height: 4rem;
    display: flex;
    border-radius: 5%;
    justify-content: space-evenly;
    align-items: center;
    cursor: pointer;
  }

  .user-container .user-container-2 .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #111;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
  }

  .user-container .side-logout {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 24%;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      transform: scale(1.04);
      font-weight: bold;
    }
  }
`;

