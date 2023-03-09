import React, { useEffect } from "react";
import yourdetails from "./images/yourdetails.png";
import "./YourDetails.css";
import { useState } from "react";


export default function CurrentPlayer(props) {
  console.log(props);

  const displayCard=(props)=>{
    const {loggedInPlayer} =props;
    const {OwnedAssets}=props;
    console.log(OwnedAssets)
    console.log(loggedInPlayer)
    if(loggedInPlayer.length >0){
     return(<>
     <div className="ajunek">
      <div className="playercardyourdetails" style={{ height: "150px", width: "150px" }}>
      <h4> {loggedInPlayer[0].userId} </h4>
      Wallet Balance: <h5>{loggedInPlayer[0].walletBalance}</h5>  
      Current Place:<h5>{loggedInPlayer[0].currentPlace} </h5> 
      Assets:
      {OwnedAssets.map(place=><h5 key={place.placeSequence}>{place.placeName}</h5>)}
     
     
    </div>
    </div>
      </>
     )
    }else{
      return <h6>no player</h6>
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
  return <>{displayCard(props)}</>
}