import React from "react";
import { ModalStyled } from "assets/style/styled";

const Modal = React.memo(function Modal({ setModalOnOff, modalOnOff }) {
  return (
    <ModalStyled modalOnOff={modalOnOff.current}>
      <div className="modal-fullscreen"></div>
      <div className="modal--container">
        <header>
          {modalOnOff.titles.map((title, idx) => (
            <div key={idx}>{title}</div>
          ))}
        </header>
        <main>
          <button
            onClick={() =>
              setModalOnOff({ ...modalOnOff, current: !modalOnOff.current })
            }
          >
            닫기
          </button>
        </main>
      </div>
    </ModalStyled>
  );
});

export default Modal;
