import { Firestore } from "firebase/firestore";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import "./GamePage.css";
import LocationDataServices from "./servicesdgh";
import { Table, Button } from "react-bootstrap";
import Timer from './timer'
import {
  doc,
  addDoc,
  onSnapshot,
  updateDoc,
  setDoc,
  deleteDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../interceptors/firebase";
import BidModal from "./modal/BidModal";

const SellLocList = ({ getBookId }) => {
  const colletionRef = collection(db, localStorage.getItem("gameId"));
  const [sellLocations, getSellLocations] = useState([]);
  const [jaaga, setJaaga] = useState([]);
  const [bidjaaga, setBidJaaga] = useState([]);

  const [bidLoc, setBidLoc] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [loadingBid, setLoadingBid] = useState(false);
  const [bidPrice, setBidPrice] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
   
    sagleSellLocDetry();
  },[])
  useEffect(() => {
    sagleSellLocDe();
    sagleBidLocDe();
    
  }, [doc.id]);
  useEffect(()=>{
    getParticularLocation();
  }, [])
  var cost=parseInt(localStorage.getItem("buyerBid"))

  const data = ({
    
      "gameId" : localStorage.getItem("gameId"),
      "locationId": localStorage.getItem("selllocId"),
      "buyerId":localStorage.getItem("buyerId"),
      "transactionCost":cost
  
    
  });
  const config = {
    method: 'post',
    url: '/api/vyapar/selllocation/',
    headers: {
      'x-access-token': localStorage.getItem('x-access-token')
    },
    data: data
  };

  const sellconfirmLoc = async () => {
    axios(config).then((response) => {

      if (response.data.status === "Success") {
        console.log(response.data)
        window.confirm(response.data.status)
      }
    })}

  


  function SellModal() {
  
  
  
    return (
      <>
        
        <Modal show={show} onHide={handleClose}
        centered backdrop="static">
          <Modal.Header closeButton style={{backgroundColor:"green"}}>
            <Modal.Title>Confirm Transaction</Modal.Title>
          </Modal.Header>
          <Modal.Body>Do you wish to Sell {localStorage.getItem('selllocName')}!</Modal.Body>
          <Modal.Body>Selling To : {localStorage.getItem('buyerId')}</Modal.Body>
          <Modal.Body>Buyer Bid price : {localStorage.getItem('buyerBid')}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Go Back
            </Button>
            <Button variant="primary" onClick={() => {sellconfirmLoc();handleClose()}}>
              Confirm Sell
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  const handleBidPrice = (e) => {
    console.log(e.target.value);
    setBidPrice(e.target.value);
  };

  //getting clicked record
  const getParticularLocation = async (locId) => {
    console.log(locId);
    const locdata = await LocationDataServices.getBook(locId);
    console.log("the record is :", locdata.data());

   if (localStorage.getItem("user") === locdata.data().sellerName) {
     window.alert("seller can't bid!");
    }
    if (localStorage.getItem("user") != locdata.data().sellerName) {
      window.alert("you are a bidder");
      try {
        const docRef = await addDoc(collection(db, localStorage.getItem("gameId")), {
          "placeId":locdata.data().placeId,
          "locationForSale":locdata.data().locationForSale,
          "biddingPrice":bidPrice,
          "buyerName":localStorage.getItem("user"),
          "class":"buy"
      });
      console.log("Document written with ID: ", docRef.id);
      sagleSellLocDe();
      sagleBidLocDe();
      } catch (error) {
        console.error("Error adding document: ", error);

      }
    }
  };

  const sellApiCall=async(locId)=>{
    console.log(locId);
    const locdata = await LocationDataServices.getBook(locId);
    console.log("the record is :", locdata.data());
    console.log(locdata.data().buyerName);
    localStorage.setItem("buyerId",locdata.data().buyerName);
    localStorage.setItem("buyerBid",locdata.data().biddingPrice);

  }
  const sagleSellLocDe = async () => {
    const data = await getDocs(query(collection(db,localStorage.getItem("gameId")),where("class", "==", "sell")));
    console.log(data.docs);
    setJaaga(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    
    
  };
  const sagleSellLocDetry = async () => {
    const data = await getDocs(query(collection(db,localStorage.getItem("gameId")),where("class", "==", "sell")));
    console.log(data.docs);
    setJaaga(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    
  };
  const sagleBidLocDe = async () => {
    const data = await getDocs(query(collection(db,localStorage.getItem("gameId")),where("class", "==", "buy")));
    console.log(data.docs);
    setBidJaaga(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    
  };

  const deleteHandler = async (id) => {
    await LocationDataServices.deleteBook(id);
    sagleSellLocDe();
    sagleBidLocDe();
  };

  useEffect(() => {
    const getData = onSnapshot(colletionRef, (querySnapshot) => {
      const getLocationsFromFirebase = [];
      querySnapshot.forEach((doc) => {
        getLocationsFromFirebase.push(doc.data());
      });
      getSellLocations(getLocationsFromFirebase);
    });
    return () => {
      getData();
      sagleSellLocDe();
      sagleBidLocDe()
    };
  }, []);
  return (
    <>
      <SellModal
        show={modalShow}
        onHide={() => setModalShow(false)} />
      <div className="mb-2">
        <Button variant="dark edit" onClick={()=>{sagleSellLocDe()}}>
          Refresh List
        </Button>
        
      </div>
    
      <div className="sellLocationlist">
      <h4>Availabe For Sale:</h4>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>loc</th>
            <th>seller</th>
            <th>S.P</th>
            <th>Bidding Price</th>
            <th>Bid</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {jaaga.map((doc, index) => {
            return (
              <tr key={doc.id}>
                <td>{index + 1}</td>
                <td>{doc.locationForSale}</td>
                <td>{doc.sellerName}</td>
                <td>{doc.sellingPrice}</td>
                <td>
                  <input
                    name="bidprice"
                    type="number"
                    placeholder="Bid Price"
                    onChange={handleBidPrice} />
                </td>
                <td>
                  <Button
                    variant="secondary"
                    className="edit"
                    onClick={() => {
                      getParticularLocation(doc.id);
                    } }
                  >
                    Bid
                  </Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    className="delete"
                    onClick={() => deleteHandler(doc.id)}
                  >
                    Cancel
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
   <div className="bidLocationlist">
        <h4>Raised Bids:</h4>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>loc</th>
              <th>buyer</th>
              <th>B.P</th>
              <th>Sell</th>
            </tr>
          </thead>
          <tbody>
            {bidjaaga.map((doc, index) => {
              return (
                <tr key={doc.id}>
                  <td>{index + 1}</td>
                  <td>{doc.locationForSale}</td>
                  <td>{doc.buyerName}</td>
                  <td>{doc.biddingPrice}</td>

                  <td>
                    <Button
                      variant="secondary"
                      className="edit"
                      onClick={() => {
                        setModalShow(true);

                        handleShow();

                        sellApiCall(doc.id);
                      } }
                    >
                      Sell
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      className="delete"
                      onClick={(e) => deleteHandler(doc.id)}
                    >
                      Cancel
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

      </div>
    </div>
    </>
  );
};
export default SellLocList;
