import { all } from "axios";
import React from "react";
import Board from "./Board";
import Dashboard from "./Dashboard";
import "./Childledger.css";
import { giveLocation } from "./LocationName";
import Table from 'react-bootstrap/Table'
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import NavBarAft from '../NavbarAft'
import { faWindowRestore } from "@fortawesome/free-solid-svg-icons";

export default function Childledger(props) {

  const allTransactions = props.allTransactions;
  const [modalerror,setErrorModal]=React.useState(false);
  const [errorcatch,setErrorCatch]=React.useState();
  
  function ErrorModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton style={{backgroundColor:"red"}}>
          <Modal.Title id="contained-modal-title-vcenter">
            Something Unexcepted Occured...
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Vyapar Says</h4>
          <p>
            {errorcatch}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const lenght = props.allTransactions.length;
  console.log(lenght);

  const [mediaItem, setMediaItem] = React.useState(allTransactions[lenght - 1]);
  const [index, setIndex] = React.useState(lenght - 1);
  const [locations, getLocations] = React.useState([]);
  const [playersforlist, getPlayersforlist] = React.useState([]);
const navigate = useNavigate();
  const [players, getPlayers] = React.useState([]);
  const [playersnext, getPlayersnext] = React.useState([]);

  React.useEffect(() => {
    
    if(index!=0){
    const timerId = setInterval(
      () => setIndex((i) => (i - 1)),
      1000
    );
    
    return () => clearInterval(timerId);
  }
  if(index==0)
  {
    const consolemes=(allTransactions[0].assetData.winner)
    setErrorCatch(consolemes)
    setErrorModal(true)
    const timerId = setInterval(
      () => setIndex((i) => (i )),
      1000
    );
    
    return () => clearInterval(timerId);
  }
 
  
  else{
    setIndex(allTransactions[lenght - 1]);
  }
  });
  

  React.useEffect(() => {
   
    setMediaItem(allTransactions[index]);
    getLocations(allTransactions[index].assetData.locations);
    getPlayers(allTransactions[index].assetData.players);
    getPlayersforlist(allTransactions[index].assetData.players);

    
      getPlayersnext(allTransactions[index].assetData.players);
      getPlayersforlist([...playersforlist, ...playersnext]);
     
    
             
        
        
       
        
            
    
  }, [index]);
  

  return (
    <>
    
    <NavBarAft/>
    <div className="ledgerscreen">
      <div className="tablescreen">
      <div>
        <h3>
          Presenting Ledger of the Game : {localStorage.getItem("gameId")}
        </h3>
        <h4>Transaction Number:{index}</h4>
      </div>
      <div className="Tablelistscroll">
        <table className="table02">
          <tr>
            <th className="th">Name</th>
            <th className="th">Place</th>
            <th className="th">Wallet</th>
          </tr>

          {playersforlist.map((player, indexno) => (
            <tr data-index={indexno}>
              <td className="td">{player.userId}</td>
              <td className="td">{giveLocation(player.currentPlace)}</td>
              <td className="td">{player.walletBalance}</td>
            </tr>
          ))}
        </table>
        
        </div>
        <ErrorModal
              show={modalerror}
              onHide={() => setErrorModal(false)}
            />
        </div>
  
<div className="boardscreen">
      <Board locations={locations} players={players} />
      </div>
      </div>
      
    </>
  );
}


