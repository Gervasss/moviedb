import styled from '@emotion/styled';

type SidebarProps = {
  darkMode: boolean;
};

export const Sidebar = styled.div<SidebarProps>`
  width: 80%;
  height: 90%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  overflow: none;
  border-radius: 30px; 
  
  
 
  background-color: ${({ darkMode }) => (darkMode ? '#00000' : 'rgba(255, 255, 255, 0.7)')}; 
  color: ${({ darkMode }) => (darkMode ? 'white' : 'black')};
  border: 1px solid ${({ darkMode }) => (darkMode ? '#444' : '#eee')};
  box-shadow: ${({ darkMode }) => (darkMode ? '0 8px 32px 0 rgba(0, 0, 0, 0.8)' : '0 8px 32px 0 rgba(31, 38, 135, 0.1)')};
  transition: all 0.3s ease-in-out;

  
  .admin-buttons .buttons .sideButton {
    width: 100%;
    height: 14%;
    display: flex;
    font-size: 1rem;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    padding: 0 1.2rem;
    border: 1px solid transparent;
    border-radius: 15px;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    background-color: transparent;
    color: ${({ darkMode }) => (darkMode ? '#bbb' : '#444')};

    &:hover {
      color: white;
      background-color: #ff0000; 
      /* Efeito de Sombra Vermelha (Glow) idêntico à foto */
      box-shadow: 0 0 15px rgba(255, 0, 0, 0.6), 0 0 5px rgba(255, 0, 0, 0.4);
      transform: translateX(5px); /* Leve deslocamento para a direita no hover */
    }

   
    &.active {
      border: 1px solid red;
      box-shadow: inset 0 0 10px rgba(255, 0, 0, 0.2);
    }
  }


  .movie-logo {
    width: 200px;
    height: 200px;
    border-radius: 990px;
    margin-bottom: 2rem;
    box-shadow: 0 0 20px rgba(255, 0, 0, 0.2);
    object-fit: contain;
  }

  .admin-buttons {
    width: 100%;
    height: 60%;
    margin-top: 6%;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid ${({ darkMode }) => (darkMode ? '#444' : '#e6e6e6')};
  }

  .switch {
  margin-left:-30px;
    cursor: pointer;
    filter: drop-shadow(0 0 5px rgba(255, 0, 0, 0.5));
   
  }
  
  
`;