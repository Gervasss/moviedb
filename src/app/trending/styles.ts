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


 .card-trending {
      border: 2px solid #000;
      margin-top:-5%;
      margin: 10px;
      display: flex;
      padding:7px;
      background-color:${({ darkMode }) => (darkMode ? '#2c2c2c' : '#fff')};
      border-radius:10px;
      box-shadow:${({ darkMode }) => (darkMode ? '10px 10px 1rem #2c2c2c' : '10px 10px 1rem #ccc')};
      flex-direction: column;
      justify-content: flex-start;
      margin-bottom: 0%;
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
     width: 100%;
      border-top-left-radius: 10px; 
      border-top-right-radius: 10px;
       border-bottom-left-radius: 10px; 
      border-bottom-right-radius: 10px;
      height: 220px;             
      object-fit: contein;   
      object-position: 50% 10%;  
    }
      
    }
     .lista-trending {
      display: grid;
      gap: 1px;
      overflow-y: auto;
       scrollbar-color: transparent transparent;
    
     
}

.card-trending.favorited {
    border-color: red;
    box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
  }
   
      `;