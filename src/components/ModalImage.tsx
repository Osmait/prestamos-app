import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal } from "@nextui-org/react";
import React, { useState } from "react";
import { DropZone } from "./Dropzone";

export const ModalImage = ({ Id }: any) => {
  const [visible, setVisible] = useState(false);

  const closeHandler = () => {
    setVisible(false);
  };
  return (
    <div>
      <Button onPress={() => setVisible(true)}>
        <FontAwesomeIcon icon={faCamera} width={"20px"} />
      </Button>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header justify="space-between"></Modal.Header>
        <DropZone id={Id} closeHandler={closeHandler} />
      </Modal>
    </div>
  );
};
