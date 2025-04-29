import styled from '@emotion/styled';
type TrendingProps= {
    darkMode: boolean;  
  };


export const Trending = styled.div<TrendingProps>`
    width: 100%;
    height: 90%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 10px;

   

   
    .cadastro-1-movies{
     background-color: ${({ darkMode }) => (darkMode ? '#333' : '#fff')}; 
     color:${({ darkMode }) => (darkMode ? '#fff' : '#333')}; 
    
    }


     .card {
      border: 2px solid #000;
      margin-top:-5%;
      margin: 10px;
      display: flex;
      background-color:${({ darkMode }) => (darkMode ? '#2c2c2c' : '#fff')};
      border-radius:10px;
      box-shadow:${({ darkMode }) => (darkMode ? '10px 10px 1rem #2c2c2c' : '10px 10px 1rem #ccc')};
      flex-direction: column;
      justify-content: center;
      margin-bottom: 3%;
      transition: 0.3s;
      &:hover {
        transform: scale(1.06);
      }
   
         h3{
        margin-left:5px;
        margin-top:-1%;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
      }

      p{
        margin-left:5px;     
       padding:-30%; 
      }

      .nota{
      
      
      
      }

       .poster{
      width:100%;
      height:40%;
      border: 2px solid #000;
     box-shadow:${({ darkMode }) => (darkMode ? '10px 10px 1rem #2c2c2c' : '10px 10px 1rem #ccc')};
     border-top-left-radius: 10px;  
     border-top-right-radius: 10px;
    }
      
    }
     .lista {
      margin-left:1%;
      display: grid;
      grid-template-columns: repeat(5, 1fr); 
      gap: 1px; 
      min-height: 70%; 
      height: 100%; 
      overflow-y: auto; 
       width: 95%;
       scrollbar-color: transparent transparent;
    
     
}
   
      `;