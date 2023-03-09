import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";
import BookDataService from "./servicesdgh";

import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios, { Axios } from "axios";
import Container from "react-bootstrap/Container";

const AddBook = ({ id, setBookId}) => {
  const [placeId, setTitle] = useState("");
  const [bidderprice, setAuthor] = useState("");
  const [playerName, setPlayer] = useState("");
  const [markForSale, setMarsell] = useState("");
  const [gameId, setGameId] = useState("");
  const [bidDetails,setBidDetails] = useState({
      placeId:'',
      bidderprice:'',
      markForSale:'',
      biddername:'',
      playerName:'',
      gameId:'' 
  });
  const biddername=localStorage.getItem("user")
  //const [status, setStatus] = useState("Available");
  const [flag, setFlag] = useState(true);
  const [message, setMessage] = useState({ error: false, msg: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (placeId === "" || bidderprice === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }
    const newBook = {"bids":{ 
      "biddername":[
        placeId,
      bidderprice,
      markForSale,
      biddername,
      playerName,
      gameId ]
    }};

    console.log(newBook);

    try {
      if (id !== undefined && id !== "") {
        console.log("racch")
        await BookDataService.updateBook(id, newBook);
        setBookId("");
        setMessage({ error: false, msg: "Updated successfully!" });
      } else {
        await BookDataService.addBooks(newBook);
        setMessage({ error: false, msg: "New Book added successfully!" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    setTitle("");
    setAuthor("");
  };

  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await BookDataService.getBook(id);
      console.log("the record is :", docSnap.data());
      setTitle(docSnap.data().placeId);
      setAuthor(docSnap.data().placePrice);
      setPlayer(docSnap.data().playerName);
      setMarsell(docSnap.data().markForSale);
      setGameId(docSnap.data().gameId);
      setBidDetails({
      placeId:docSnap.data().placeId,
      bidderprice:docSnap.data().placePrice,
      markForSale:docSnap.data().markForSale,
      biddername:biddername,
      playerName:docSnap.data().playerName,
      gameId:docSnap.data().gameId 
      });
      
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  useEffect(() => {
    console.log("The id here is : ", id);
    if (id !== undefined && id !== "") {
      editHandler();
    }
  }, [id]);
  return (
        <div className="p-4 box">
        {message?.msg && (
          <Alert
            variant={message?.error ? "danger" : "success"}
            dismissible
            onClose={() => setMessage("")}
          >
            {message?.msg}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBookTitle">
            <InputGroup>
              <InputGroup.Text id="formBookTitle">B</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Book Title"
                value={placeId}
                readonly
                onChange={(e) => setTitle(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBookAuthor">
            <InputGroup>
              <InputGroup.Text id="formBookAuthor">A</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Book Author"
                value={bidderprice}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <Button variant="primary" type="Submit" >
              Add/ Update
            </Button>
        
          
        </Form>
        
 
      </div>
     
   
  );
};

export default AddBook;

