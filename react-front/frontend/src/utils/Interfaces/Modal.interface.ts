export interface ModalProps {
    showModal: boolean;
    onClose: () => void;
}

export interface ModalStates {
    [requestId: number]: boolean;
  }