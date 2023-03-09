import axios from "axios";
import React from "react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from '../interceptors/firebase';
import Die from './Die'
import "./RollDice.css";
import { useEffect, useState } from "react";
import Board from "./Board";
import LOC from "./images/gamer.png";
import Dashboard from "./Dashboard";
import GameList from "./GameList";
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from "./NavBar";
import "./GamePage.css";
import NavbarAft from "../NavbarAft";
import UncontrolledExample from "./Rules";
import Form from 'react-bootstrap/Form';

import SellLocList from './SellLocLists';
import "./RollDice.css";

import ButtonsTag from "./ButtonsTag";
import NavbarGame from "../navbaringame";
import PurchaseModal from "./modal/PurchaseModal";
import PlayGameModal from "./modal/PlayGameModal";
import SellLocModal from "./modal/SellLocModal";
import SellTryModal from "./modal/SellTryModal";
import CurrentPlayer from "./YourDetails";
import Sidebar from './Sidebar';

import ToggleVisibility from "./ToggleVisibility";
import GlowButton from "./GlowButton";
import Locationcard from "./Locationcard";
import ibutton from "./images/information-button.png";
import SellModal from "../board/modal/SellModal";

import NextMove11 from "./NextMove";
import AddBook from "./AddBook";

function GamePage33(props) {

 const {timer}=props
 console.log(timer)
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const gameIdClicked = localStorage.getItem("gameId")
    console.log(gameIdClicked)
    //getAllPlayers();
    //getNewBoard();
    getGameData(gameIdClicked);
    

  }, []
  );
  useEffect(()=>{
    //refreshper10seconds()
  })
  const [state, setState] = useState({
    die1: 'one',
    die2: 'three',
    rolling: false,
    totalScore: 4,
  });

  const { die1, die2, rolling, totalScore } = state;
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  // const [todos, setTodos] = useState("");
  const [show, setShow] = useState(false);
  const [OwnedAssets, getOwnedAssets] = useState([]);
  const [loggedInPlayer, getLoggedInPlayer] = useState([]);
  const [locations, setLocations] = useState([]);
  const [watch, Display] = useState();
  const [currentLoc, CurrentLOC] = useState('');
  const [move, NextMove] = useState();
  const [saledikhao, setSale] = useState([])
  const [tyacheAssets, getTyacheAssets] = useState([]);
  const [sellModal, setSellModal] = React.useState(false);
  //const [locations, getLocations] = useState([]);
  const [players, setPlayers] = useState([]);
  const [allGamesList, setAllGamesList] = useState([]);
  const [createdBy, setCreatedBy] = useState();
  //const [sellm,setSellModal]=useState([]);
  const [modalShow, setModelShow] = useState(false);
  const [ownerloc, setOwner] = useState([]);
  const [moveNext, setMoveNext] = useState('');
  const [modelShow, setModalShow] = React.useState(false);
  const [modelPlay, setModalPlay] = React.useState(false);
  const [modalerror,setErrorModal]=React.useState(false);
  const [errorcatch,setErrorCatch]=React.useState();
  //const [OwnedAssets,getOwnedAssets] = useState([]);
  //const [players, getPlayers] = useState([]);
  const [nextMoveState, getNextMove] = useState();
  //const [loggedInPlayer, getLoggedInPlayer] = useState([]);
  const [nextMovePlayer, getNextMovePlayer] = useState([]);
  const [locationsell, setLocationSell] = useState('');
  const [transactionamountSell, settransactionAmountSell] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  var diceRes = parseInt(localStorage.getItem("diceres"))
  var tokenAmount = parseInt(transactionamountSell)
  const [bookId, setBookId] = useState("");
  

  

  const refreshper10seconds=()=>{
     axios(config3).then((response)=>{
      console.log("I refreshed")
      const allGames = response.data.data
          console.log(allGames);
          setAllGamesList(allGames);
          //const particularResponse = allGames.filter((game) => game.assetData.assetId === gameIdClicked)
          //console.log(particularResponse)
          const allLocations = response.data.data.assetData.locations;
          const move = response.data.data.assetData.nextMove;
          setMoveNext(move)
          const allOwners = allLocations.filter((owner) => owner.placeOwner === localStorage.getItem("user"))
          console.log(allOwners)
          getOwnedAssets(allOwners);
          const allPlayers = response.data.data.assetData.players
          const createdByVariable = response.data.data.assetData.createdBy
          setCreatedBy(createdByVariable);
          setLocations(allLocations);
          setPlayers(allPlayers);
          setOwner(allOwners);
          const nextMove = response.data.data.assetData.nextMove;
          getNextMove(nextMove);
          console.log(nextMove);
          let loggedInDetails = allPlayers.filter(
            (player) => player.userId === localStorage.getItem('user')
          );
          console.log("loggedInDetails", loggedInDetails);
          getLoggedInPlayer(loggedInDetails);



          let nextMoveDetails = allPlayers.filter(
            (player) => player.playSequence === nextMove
          );
          console.log("nextMoveDetails", nextMoveDetails);
          getNextMovePlayer(nextMoveDetails);

     },[])
  }

  const data = JSON.stringify({
    "message": "get all locations"
  });
  const data1 = ({
    "gameId": localStorage.getItem("gameId"),
    "diceResult": diceRes,
    "User": "lahu@nic.in Added Just for session Identity"
  });

  const config = {
    method: 'post',
    url: '/api/vyapar/getlocations/',
    headers: {
      'x-access-token': localStorage.getItem('x-access-token')
    },
    data: data
  };
  const config1 = {
    method: 'post',
    url: '/api/vyapar/playgame/',
    headers: {
      'x-access-token': localStorage.getItem('x-access-token')
    },
    data: data1
  };
  const data2 = ({
    "message": "Get details of all games"
  });
  const data3 = ({
    "assetId": localStorage.getItem("gameId")
  });
  const config2 = {
    method: 'post',
    url: '/api/vyapar/getgames/',
    headers: {
      'x-access-token': localStorage.getItem('x-access-token')
    },
    data: data2
  };
  const config3= {
    method: 'post',
    url: '/api/vyapar/getasset/',
    headers: {
      'x-access-token': localStorage.getItem('x-access-token')
    },
    data: data3
  };

  //rolldiceimplementation
  const RollDice = ({ sides }) => {


    const roll = () => {
      const newDie1 = sides[Math.floor(Math.random() * sides.length)];
      const newDie2 = sides[Math.floor(Math.random() * sides.length)];
      const score1 = Object.values(newDie1);
      const score2 = Object.values(newDie2);
      setState({
        die1: Object.keys(newDie1),
        die2: Object.keys(newDie2),
        rolling: true,
        totalScore: score1[0] + score2[0],

      });
      setTimeout(() => {
        setState((prevState) => ({ ...prevState, rolling: false }));
      }, 1000);
    };

    const update = async => {
      localStorage.setItem('dicer', totalScore)
    }
    return (
      <>
        <div className="roll-dice">
          <div className="rolldice-container">
            <Die face={String(die1)} rolling={rolling} />
            <Die face={String(die2)} rolling={rolling} />
          </div>
          <button onClick={() => { roll();  getNewBoard() }} disabled={rolling}>
            {rolling ? "Rolling..." : "Roll Dice"}
          </button>
          {localStorage.setItem("diceres", totalScore)}
        </div>
      </>
    );
  };

  RollDice.defaultProps = {
    sides: [
      { one: 1 },
      { two: 2 },
      { three: 3 },
      { four: 4 },
      { five: 5 },
      { six: 6 },
    ],
  };




  const handlePurchaseModalClick = (saglelocations, sagleplayers) => {
    //locations and players of purchase api response
    console.log(saglelocations, sagleplayers);
    setLocations(saglelocations);
    setPlayers(sagleplayers);
  }

  const getAllPlayers = async () => {
    await axios(config)
      .then((response) => {
        // const allPlayers = response.data.data.game.players;

        for (let i = 0; i < 36; i++) {
          locations.push(response.data.data[i].assetData);
        }

      })
      .catch(error => console.error(`Error: ${error}`)
      );
  }
  const getGameData = async () => {
    axios(config3)
      .then((response) => {
        if (response.data.status === "Success") {

          console.log(response.data);
          const allGames = response.data.data
          console.log(allGames);
          setAllGamesList(allGames);
          //const particularResponse = allGames.filter((game) => game.assetData.assetId === gameIdClicked)
          //console.log(particularResponse)
          const allLocations = response.data.data.assetData.locations;
          const move = response.data.data.assetData.nextMove;
          setMoveNext(move)
          const allOwners = allLocations.filter((owner) => owner.placeOwner === localStorage.getItem("user"))
          console.log(allOwners)
          getOwnedAssets(allOwners);
          const allPlayers = response.data.data.assetData.players
          const createdByVariable = response.data.data.assetData.createdBy
          setCreatedBy(createdByVariable);
          setLocations(allLocations);
          setPlayers(allPlayers);
          setOwner(allOwners);
          const nextMove = response.data.data.assetData.nextMove;
          getNextMove(nextMove);
          console.log(nextMove);
          let loggedInDetails = allPlayers.filter(
            (player) => player.userId === localStorage.getItem('user')
          );
          console.log("loggedInDetails", loggedInDetails);
          getLoggedInPlayer(loggedInDetails);



          let nextMoveDetails = allPlayers.filter(
            (player) => player.playSequence === nextMove
          );
          console.log("nextMoveDetails", nextMoveDetails);
          getNextMovePlayer(nextMoveDetails);

          setLoading(false);


        }
        if (response.data.status === "Error"){
          
          const consolemes=response.data.data.errorMessage;
          setErrorCatch(consolemes)
          setErrorModal(true)
          getGameData();
        }


      })
  }
 
  
 



  //hitting play game api
  const getNewBoard = async () => {
    axios(config1).then((response) => {
      if (response.data.status === "Success") {
        console.log(response.data)
        //setLoading(true);
        const display = (response.data.data.transactionMessage)
        const currentloc = (response.data.data.game.players)

        const konkhernar = (response.data.data.game.nextMove)
        const allplayers = (response.data.data.game.players)
        const newLocation = (response.data.data.game.locations)
        console.log(display)
        Display(display)
        setLocations(newLocation)
        setMoveNext(konkhernar)
        setPlayers(allplayers)
        CurrentLOC(currentloc)
        //window.confirm(display)
        //window.confirm("Next Move of Player:", { konkhernar })
        NextMove(konkhernar)
        setModalShow(true)
        //setLoading(false);
      }
      if (response.data.status === "Error") {
        
        const consolemes=response.data.data.errorMessage;
        setErrorCatch(consolemes)
        setErrorModal(true)
      }

    })
  }


  console.log(locations);
  if (isLoading) {
    return <div className="App">
      <img src={LOC} alt="" width="120" height="120" /></div>;
  }
  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton style={{backgroundColor:"green"}}>
          <Modal.Title id="contained-modal-title-vcenter">
            Dice Results
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Vyapar Says</h4>
          <p>
            {watch}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
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

  const getBookIdHandler = (id) => {
    console.log("The ID of document to be edited: ", id);
    setBookId(id);
    setErrorCatch(true)
  };
 


  //sellmodal
  function SellLocModal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
      <Modal

        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered


      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Confirm Location For Sale
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="varchar"
                placeholder="name@example.com"
                autoFocus
                onChange={e => setLocationSell(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control type="varchar"
                placeholder="name@example.com"
                autoFocus
                onChange={e => settransactionAmountSell(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>Send For Bid</Button>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  //todo
  //fetch display

  const givePlayerDetails = async (playerId) => { 
    let haplayer = players.filter((player) => player.userId === playerId); 
    getNextMovePlayer(haplayer); 
    console.log(playerId) 
    console.log(haplayer) 
    let assets = locations.filter((location) => location.placeOwner === playerId); 
    getTyacheAssets(assets); 
  };
console.log(bookId)
  return (
    <>
    <div id="scroll-container">
        <div id="scroll-text">Game ID:{localStorage.getItem("gameId")}  Created By: {createdBy}</div>
      </div>
      <div className="containergame" id="outer-container">
      

        <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />

        <div className="pahiladiv">
          <Locationcard players={players} loggedInPlayer={loggedInPlayer} OwnedAssets={OwnedAssets} />
          <NextMove11 nextMovePlayer={nextMovePlayer} players={players} locations={locations} tyacheAssets={tyacheAssets} />
          <div className="playerslist">
            <h3>Players:</h3>
            {players.map((player) => (
              <button key={player.playSequence} style={{ color: "Green" }} onClick={() => {
                givePlayerDetails(player.userId);
              }}>{player.userId}</button>
            ))}
          </div>


          <CurrentPlayer loggedInPlayer={loggedInPlayer} OwnedAssets={OwnedAssets} />

        </div>

        <div className="dusradiv">
          
          <div className="boarddiv">
          <RollDice />
          
            <Board locations={locations} players={players} />
          </div>

        </div>

        <div className="tisradiv">
          
        <SellLocList getBookId={getBookIdHandler} />
          <button className="infobutton" onClick={() => setModalShow(true)}> <img src={ibutton} alt="" width="40" height="40" /> </button>
         <div className="mainfunctions">
         
         <div className="buttongroup" >
            
            <Button  onClick={() => { setModelShow(true); getGameData(); }
            }>
             
                PURCHASE
              
            </Button>
            <br/>
            <SellTryModal ownedassets={OwnedAssets}  />

           
            
           
            <MyVerticallyCenteredModal
              show={modelShow}
              onHide={() => setModalShow(false)}
            />
            <ErrorModal
              show={modalerror}
              onHide={() => setErrorModal(false)}
            />
            <PurchaseModal show={modalShow} players={players} locations={locations} onHide={() => setModelShow(false)} onHandlePurchaseModalClick={handlePurchaseModalClick} />
              <SellLocModal show={modelPlay} onHide={() => setModalPlay(false)} onHandlePurchaseModalClick={handlePurchaseModalClick} />
        
            

            <br />
          </div>
         </div>
          



        </div>
        <div className="Dashboarddiv" id="page-wrap">
          <ToggleVisibility>
            <h4>{localStorage.getItem("user")}</h4>
            <div>GameID:{localStorage.getItem("gameId")}</div>
            <div>CurrentMove:{moveNext}</div>
            <Dashboard players={players} pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
          </ToggleVisibility>
        </div>




      </div>


    </>

  )
}


//Axios is a promise-based library, so the promise must be handled. I am going to use `then` to handle the promise if it is fulfilled, and `catch` if it is rejected (aka, I get an error).
//Then is a callback function that automatically has the response object as an argument. That’s great for us, because the data we’re retrieving will be inside that response object. This is where things will be different based on the data that you’re retrieving. My entire GET request looks like this:


export default GamePage33;