import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

function ToastAction({ status, message}) {
  return (
    <Row>
      {
        status ? <Col xs={6}>
        <Toast  show={status} delay={1000} autohide>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </Col> : null
      }
    </Row>
  );
}
export default ToastAction;