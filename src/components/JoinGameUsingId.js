import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import React from 'react';



export const JoinGameUsingId = () => {
   
    const navigate = useNavigate();
   const [isLoading,setLoading]=useState(false);
    //const [navigate, setNavigate] = useState(false);

    const data = ({
        "gameId":localStorage.getItem('gameId'),
        "User": localStorage.getItem('user')
      });
      
      const config = {
        method: 'post',
        url: '/api/vyapar/joingame/',
        headers: { 
        'x-access-token': localStorage.getItem('x-access-token')   },
         data : data
      };
      
      const submit = async e =>{
        e.preventDefault();
      axios(config)
        .then((response)=>{
          if(response.data.status === "Success"){
            console.log((response.data));
            navigate('/game-board');
            
          }
          if (response.data.Status==="Error"){
            window.confirm(response.data.data.errorMessage);
          }
            
         // const allPlayers = response.data.data.game.players;
       
     
        })
       
    }
  
   
      
      
      
      
    
 
  return (
   
    <main className="form-signin">
    <form onSubmit={submit}>
    <h1 className="h3 mb-3 fw-normal">Do You want To join The Game :{localStorage.getItem("gameId")}</h1>
    

            <button className="w-100 btn btn-lg btn-primary" type="submit">Yes Join!!</button>

    </form>
</main>


  )
}

export default JoinGameUsingId;
