
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from '../../interceptors/firebase';
import { async } from "@firebase/util";
import LocationDataServices from "../servicesdgh"

function BidModal(props) {

  const displayAssets = () => {
   
  const addBidDoc = async (e) => {
    try {
        const docRef = await addDoc(collection(db, localStorage.getItem("gameId")), {
            "placeId":localStorage.getItem("selllocId"),
            "locationForSale":localStorage.getItem("selllocName"),
            "BiddingPrice":"",
            "BuyerName":localStorage.getItem("user"),
            "class":"bid"
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Sell Location Menu:
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4 style={{ color: "Blue" }}>Select the loaction you want to Sell:</h4>
        {displayAssets(props)}
        <br />
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Selling Price of the Location:</Form.Label>
            <Form.Control
              type="input"
              placeholder="5000"
              autoFocus
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={props.onHide}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
          }}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
}
export default BidModal;
