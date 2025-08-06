import styled from '@emotion/styled';

type PageContainerProps = {
  display?: string;
  padding?: number | string;
  darkMode: boolean;  
};

export const PageContainer = styled.div<PageContainerProps>`
  width: 100%;
  height: 100vh;
  padding: ${({ padding }) => padding || "1rem"};
  display: ${({ display }) => display || "block"};
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: ${({ darkMode }) => (darkMode ? '#363636' : '#f5f7f9')}; 
  color: ${({ darkMode }) => (darkMode ? 'white' : 'black')};  
  transition: background-color 0.3s, color 0.3s;  /* Transição suave */


 
`;
