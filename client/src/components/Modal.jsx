import React from "react";
import { ModalStyled } from "components/style/styled";

const Modal = ({ setModalOnOff, title, modalOnOff }) => {
  return (
    <ModalStyled modalOnOff={modalOnOff}>
      <div className="modal-fullscreen"></div>
      <div className="modal--container">
        <header>{title}</header>
        <main>
          <button onClick={() => setModalOnOff(false)}>닫기</button>
        </main>
      </div>
    </ModalStyled>
  );
};

export default Modal;
