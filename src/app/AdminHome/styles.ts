import styled from '@emotion/styled';


type TopContainerProps = {
  darkMode: boolean;  
};
type CardContainerProps = {
  darkMode: boolean;  
};




export const TopContainer = styled.div<TopContainerProps>`
  width: 100%;
  height: 0.4%;
  display: flex;
  justify-content: end;
  padding: 3rem;
  border-bottom: 0.1rem solid #ccc;

  

`;



export const CardContainer = styled.div<CardContainerProps>`
  width: 20%;
  height: 10vh;
  margin: 0.5rem;
  background-color: ${({ darkMode }) => (darkMode ? '#333' : '#fff')};
  border-radius: 0.5rem;
  display: flex;
  box-shadow: 0 0 0.5rem 0.1rem rgba(0, 0, 0, 0.1);
  transition: all 0.1s ease-in-out;
    margin-left:4%;
  &:hover {
    transform: scale(1.02);
  
  }
 
`;

export const Content = styled.div`
  width: 100%;
  height: 75vh;
  padding: 1rem;
  display: flex;
`;
