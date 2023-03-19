import React, { type FC } from 'react'
import './Modal.css'

interface ModalProps {
  title: string
  message: string
  isVisible: boolean
  onConfirm?: () => void
}

const Modal: FC<ModalProps> = ({ title, message, isVisible, onConfirm }) => {
  return <div style={{ display: (isVisible ? 'inherit' : 'none') }} className="modal-container">
    <div className='modal'>
      <p className="modal-title">{title}</p>
      <p className="modal-message">{message}</p>
      <div className="modal-actions">
        <button onClick={onConfirm} className='modal-ok modal-button'>Play again!</button>
      </div>
    </div>
  </div>
}

export default Modal
