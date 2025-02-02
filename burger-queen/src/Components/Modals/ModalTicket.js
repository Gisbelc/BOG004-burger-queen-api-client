import { useState } from "react";
import "./Modal.css";
import { ModalConfirm } from "./ModalConfirm";
import { getToken, getUser, sendOrderRequest } from "../API/fetch";

export const ModalTicket = ({ children, setModalOpen, order, clientName, clientTable }) => {
  let [modalConfirm, setModalConfirm] = useState(false);

  const hiddenModal = () => {
    setModalOpen(false);
  };
  const showModalConfirm = () => {
    setModalConfirm(true);

    const url = "http://localhost:8080/orders";
    const token = getToken();
    const myProducts = order.map((product) => {
      return {
        qty: product.quantity,
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          type: product.type,
          dateEntry: product.dateEntry,
        },
      };
    });

    
    const myUserId=JSON.parse(getUser()).id;
    const myData = {
      userId: myUserId,
      client: clientName,
      clientTable : clientTable,
      products: myProducts,
      status: "pending",
      dateEntry: new Date(),
    };
    
    sendOrderRequest(url,token,myData).then((res) => {
      console.log('soy respuestaaaa ',res)
    })
  };

  return (
    <div className="modal-background">
      <div className="container-modal">
        <h1>Resumen del pedido</h1>
        <h3>Cliente : {clientName} </h3>
        <h3>Mesa : {clientTable}</h3>
        {children}
        <h2>¿Confirmar Pedido?</h2>
        <div className="container-buttons">
          <button onClick={showModalConfirm}>SI</button>
          <button className="btn-red" onClick={hiddenModal}>
            NO
          </button>
        </div>
      </div>
      {modalConfirm ? <ModalConfirm setModalOpen={setModalOpen} /> : false}
    </div>
  );
};
