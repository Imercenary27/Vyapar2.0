import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import boardImage from "./cardimages/board-game.png";
import LOC from "./cardimages/chennai.png";
import axios, { Axios } from "axios";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";


function SellModal() {
  

 

 
  
 
  const data = ({
   
    "gameId":localStorage.getItem("gameId"),
    "locationId": localStorage.getItem("purchaseId"),
    "buyerId ":localStorage.getItem("user"),
    "transactionCost":localStorage.getItem("transactionCost")
  });
  const config = {
    method: 'post',
    url: '/api/vyapar/selllocation/',
    headers: {
      'x-access-token': localStorage.getItem('x-access-token')
    },
    data: data
  };
 
  
  const submit = async e => {
  axios(config)
  .then((response)=>{
    if(response.data.status === "Success"){
      console.log((response.data));
      }
    if(response.data.status === "Error"){
      window.confirm(response.data.data.errorMessage)
    }
})

}

  
  return (
    <Modal
  
      dialogClassName="modal-100w"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Confirm your location purchase:
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Row>
            <Col xs={6} md={6}>
              Player : {localStorage.getItem("user")}
              <br />
              
              Place for Purchase:
            </Col>
            
               <Col xs={2} md={3}>
               <img src={boardImage} alt="" width="120" height="120" />
           </Col>
               
           
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => {
        submit();
          
         
        }}>Purchase</Button>
        <Button >Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default SellModal;
