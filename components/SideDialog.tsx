import { Box, Button, Form, Heading, Layer } from "grommet";
import { Close } from "grommet-icons";
import React from "react";
import { useModal } from "../context/ModalContext";

export const SideDialog: React.FC<{}> = () => {
  const { isSideOpen, sideChild, handleSideModal } = useModal();

  const onClose = () => handleSideModal({ method: "close" });

  if (isSideOpen) {
    return (
      <Layer
        position="right"
        full="vertical"
        modal
        onClickOutside={onClose}
        onEsc={onClose}
      >
        <Box fill="vertical" overflow="auto" width="medium" pad="medium">
          <Box flex={false} direction="row" justify="between">
            <Heading level={2} margin="none">
              Upload Video
            </Heading>
            <Button icon={<Close />} onClick={onClose} />
          </Box>
          {sideChild}
        </Box>
      </Layer>
    );
  }

  return <></>;
};
