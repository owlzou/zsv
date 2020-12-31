import { React, useState } from "react";
import { Folder } from "@geist-ui/react-icons";
import { Button, Modal,Grid } from "@geist-ui/react";
import { preset } from "./utils/data.js";

function PresetModal(props) {
  const [visible, setVisible] = useState(false);
  const closeHandler = (event) => {
    setVisible(false);
  };
  return (
    <>
      <Button
        icon={<Folder />}
        auto
        type="abort"
        onClick={() => setVisible(true)}
      >
        加载预设
      </Button>
      <Modal open={visible} onClose={closeHandler} width="30rem">
        <Modal.Title>选择预设</Modal.Title>
        <Modal.Content>
          <Grid.Container gap={2}>
            {preset.map((item, index) => {
              return (
                <Grid key={index}>
                  <Button
                    onClick={() => {
                      props.onPreset(item);
                      closeHandler();
                    }}
                    key={index}
                  >
                    {item.name}
                  </Button>
                </Grid>
              );
            })}
          </Grid.Container>
        </Modal.Content>
        <Modal.Action passive onClick={({ close }) => close()}>
          关闭
        </Modal.Action>
      </Modal>
    </>
  );
}

export default PresetModal;
