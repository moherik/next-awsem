import { Box, Button, Heading, Layer, Text } from "grommet";
import { useState } from "react";
import { useModal } from "../context/ModalContext";

export const ModalDialog: React.FC<{}> = (props) => {
  const { isDialogOpen, dialogChild, handleDialogModal } = useModal();

  const onClose = () => handleDialogModal({ method: "close" });

  if (isDialogOpen) {
    return (
      <Layer position="center" onClickOutside={onClose} onEsc={onClose}>
        <Box pad="medium" gap="small" width="medium">
          <Heading level={3} margin="none">
            {dialogChild.title}
          </Heading>
          <Text>{dialogChild.body}</Text>
          <Box
            as="footer"
            gap="small"
            direction="row"
            align="center"
            justify="end"
            pad={{ top: "medium", bottom: "small" }}
          >
            {dialogChild.button != null ? (
              dialogChild.button
            ) : (
              <Button label="OK" onClick={onClose} primary />
            )}
          </Box>
        </Box>
      </Layer>
    );
  }

  return <></>;
};
