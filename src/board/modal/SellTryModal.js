
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from '../../interceptors/firebase';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { ListGroup } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import AdditionalContentExample from "./AlertSuccess"
 

 function SellTryModal(props) {
  const OwnedAssets= props;
  console.log(OwnedAssets)
  const [assetsata, setassetsata] = useState([]);

  const [show, setShow] = useState(false);
  const [todo, setTodo] = useState([]);
  const [todos, setTodos] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [name,setName]= useState("");
  const [price,setPrice]= useState("");
  var pricerate=parseInt(price)
 
  const saveChanges = () => {
    localStorage.setItem("selllocCost",pricerate);
  };

  const displayAssets = (props) => {
    console.log(props);
    const ownedassets = props.ownedassets;
    console.log(ownedassets);

    const saveLocationId = async (locationId,locationName) => {
      console.log(locationId);
      localStorage.setItem("selllocId", locationId);
      localStorage.setItem("selllocName",locationName)
    };
    if (ownedassets.length > 0) {
      return ownedassets.map((asset) => (
        <Button
        onClick={() => {
          saveLocationId(asset.assetId,asset.placeName)
        }}
        key={asset.placeSequence}
        >
          {asset.placeName}
        </Button>
      ));
    }
  };

  
 




  const addTodo = async (e) => {
   
    try {
        const docRef = await addDoc(collection(db, localStorage.getItem("gameId")), {
                     "placeId":localStorage.getItem("selllocId"),
            "locationForSale":localStorage.getItem("selllocName"),
            "sellingPrice":pricerate,
            "sellerName":localStorage.getItem("user"),
            "class":"sell"
 

        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
       Sell Location
      </Button>

      <Modal show={show} onHide={handleClose} centered  backdrop="static">
        <Modal.Header closeButton style={{backgroundColor:"green"}}>
          <Modal.Title>Choose Location To Sell</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <h4 style={{ color: "Blue" }}>Select the loaction you want to Sell:</h4>
        {displayAssets(props)}
        <br />

          <Form>
           
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Set Price </Form.Label>
              <Form.Control
                type="number"
                placeholder="Price"
                autoFocus
                onChange={e => setPrice(e.target.value)}
              />
            </Form.Group>
           
          </Form>
         
  
    <div>
   
    </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{addTodo(); saveChanges();AdditionalContentExample();handleClose();}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SellTryModal