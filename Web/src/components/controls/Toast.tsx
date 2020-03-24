import React, { useEffect } from "react";
import { useState } from "react";
import Toast from "react-bootstrap/Toast";
import Moment from "react-moment";

interface ToastMessageProps {
  title: string;
  message: string;
  show: boolean;
  closeButton: boolean;
  delay?: number;
  onClose(): void;
}

export const ToastMessage = (props: ToastMessageProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(props.show);
  }, [props]);

  const OnClose = () => {
    setShow(false);
    props.onClose();
  };

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: "absolute",
        zIndex: 99,
        top: 140,
        left: 10,
        minWidth: 340
      }}
    >
      <Toast
        onClose={OnClose}
        show={show}
        delay={props.delay ? props.delay : 3000}
        autohide
      >
        <Toast.Header closeButton={props.closeButton}>
          <strong className="mr-auto">{props.title}</strong>
          <small>
            <Moment format="HH:mm:ss" />
          </small>
        </Toast.Header>
        <Toast.Body>{props.message}</Toast.Body>
      </Toast>
    </div>
  );
};
