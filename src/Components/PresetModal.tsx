import { Button, Modal, Grid } from "@geist-ui/core";
import { preset } from "../utils/data.js";

export interface Preset {
  name: string;
  vex: string;
  frag: string;
}

interface IPresetModal {
  onPreset: (a: Preset) => void;
  onClose: () => void;
  visible:boolean;
}

function PresetModal(props: IPresetModal) {
  const closeHandler = () => {
    props.onClose()
  };
  return (    
      <Modal visible={props.visible} onClose={closeHandler} width="30rem">
        <Modal.Title>选择预设</Modal.Title>
        <Modal.Content>
          <Grid.Container gap={2}>
            {preset.map((item, index) => {
              return (
                <Grid key={index} xs={12}>
                  <Button
                    onClick={() => {
                      props.onPreset(item);
                      closeHandler();
                    }}
                    key={index}
                    style={{width:"100%"}}
                  >
                    {item.name}
                  </Button>
                </Grid>
              );
            })}
          </Grid.Container>
        </Modal.Content>
        <Modal.Action passive onClick={closeHandler}>
          关闭
        </Modal.Action>
      </Modal>
  );
}

export default PresetModal;
