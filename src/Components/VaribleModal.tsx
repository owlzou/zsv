//显示支持的变量
import React, { useState } from "react";
import { Button, Modal, Table } from "@geist-ui/react";
import { Lambda } from "@geist-ui/react-icons";
import { note } from "../utils/data.js";

function VaribleModal() {
  const [visible, setVisible] = useState(false);
  const closeHandler = () => {
    setVisible(false);
  };
  const data = note;

  return (
    <>
      <Button
        icon={<Lambda />}
        auto
        type="abort"
        onClick={() => setVisible(true)}
      >
        变量支持
      </Button>
      <Modal open={visible} onClose={closeHandler} width="35rem">
        <Modal.Content>
          <Table data={data}>
            <Table.Column prop="attribute" label="属性" />
            <Table.Column prop="type" label="类型" />
            <Table.Column prop="name" label="名称" />
            <Table.Column prop="description" label="描述" />
          </Table>
        </Modal.Content>
        <Modal.Action passive onClick={({ close }) => close()}>
          关闭
        </Modal.Action>
      </Modal>
    </>
  );
}

export default VaribleModal;
