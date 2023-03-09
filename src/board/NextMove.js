import React, { useEffect } from "react";
import gamerImage from "./images/gamer.png";
import currentPlayer from "./images/currentplayer.png";

import "./NextMove.css";
import { useState } from "react";
import { giveLocation } from "./LocationName";

function NextMove11(props) {
  const players = props.players;
  const locations = props.locations;
  console.log(players);
  
  let loggedPlaayer =  players.filter((player)=>player.userId===localStorage.getItem("user"));
  console.log(loggedPlaayer);

  const [ tohPlayer, getTohPlayer]=useState(loggedPlaayer);
  const [ tyacheAssets, getTyacheAssets]=useState([]);

  const displayCard = (props) => {
    console.log(props)
    const { nextMovePlayer } = props;
    const players = props.players;
    console.log(players);
    console.log(nextMovePlayer);    
    const tyacheAssets= props.tyacheAssets;
    console.log(tyacheAssets)

  
    if (nextMovePlayer.length > 0) {
      return (
        <>
          <div className="ajunektikade">
            <div
              className="playercard"
              style={{ height: "200px", width: "290px" }}
            >
              
              <h3 style={{ color: "White" }}>{nextMovePlayer[0].userId} </h3>

              <h4 style={{ color: "Brown" }}>
                Mudra: {nextMovePlayer[0].walletBalance}{" "}
              </h4>
              <h4 style={{ color: "Blue" }}>
                Place: {giveLocation(nextMovePlayer[0].currentPlace)}{" "}
              </h4>
              <h4>
                Assets:
                <div className="assetsdiv">
              {tyacheAssets.map((place) => (
                <button key={place.placeSequence}>{place.placeName}</button>
              ))}</div>
              </h4>
            </div>
          </div>
         
        </>
      );
    } else {
      return <h6>no player</h6>;
    }
  };
  /*
  useEffect(() => {
    const {details} = props
    console.log(props);
    getLoggedInPlayerProp(details);
  }, []);
  const playerDetails = props;
  console.log(playerDetails);
*/
  return <>{displayCard(props)}</>;
}

export default NextMove11;
