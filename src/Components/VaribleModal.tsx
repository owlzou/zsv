//显示支持的变量
import { Modal, Table } from "@geist-ui/core";
import { note } from "../utils/data.js";

interface IModal {
  visible: boolean;
  onClose: () => void;
}

function VaribleModal(props:IModal) {
  const closeHandler = () => {
    props.onClose()
  };
  const data = note;

  return (
    <Modal visible={props.visible} onClose={closeHandler} width="35rem">
      <Modal.Content>
        <Table data={data}>
          <Table.Column prop="attribute" label="属性" />
          <Table.Column prop="type" label="类型" />
          <Table.Column prop="name" label="名称" />
          <Table.Column prop="description" label="描述" />
        </Table>
      </Modal.Content>
      <Modal.Action passive onClick={closeHandler}>
        关闭
      </Modal.Action>
    </Modal>
  );
}

export default VaribleModal;
