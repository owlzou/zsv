import { useState } from "react";
import { Info } from "@geist-ui/react-icons";
import { Button, Modal } from "@geist-ui/react";

function CreditModal() {
  const [visible, setVisible] = useState(false);
  const closeHandler = () => {
    setVisible(false);
  };

  return (
    <>
      <Button
        icon={<Info />}
        auto
        type="abort"
        onClick={() => setVisible(true)}
      >
        关于
      </Button>
      <Modal open={visible} onClose={closeHandler} width="35rem">
        <Modal.Content>
          <p>鸣谢：</p>
          <ul>
            <li>
              <a href="https://github.com/facebook/create-react-app">
                create-react-app
              </a>
            </li>
            <li>
              <a href="https://github.com/scniro/react-codemirror2">
                react-codemirror2
              </a>
            </li>
            <li>
              <a href="https://github.com/geist-org/react">geist-ui</a>
            </li>
          </ul>
          <p>APP中使用的默认图片来自于Unsplash：</p>
          <ul>
            <li>
              Photo by{" "}
              <a href="https://unsplash.com/@yessijes?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                Jessica Pamp
              </a>{" "}
              on{" "}
              <a href="https://unsplash.com/@yessijes?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                Unsplash
              </a>
            </li>
            <li>
              Photo by{" "}
              <a href="https://unsplash.com/@pwign?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                Anh Nguyen
              </a>{" "}
              on{" "}
              <a href="https://unsplash.com/@pwign?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                Unsplash
              </a>
            </li>
          </ul>
        </Modal.Content>
        <Modal.Action passive onClick={({ close }) => close()}>
          关闭
        </Modal.Action>
      </Modal>
    </>
  );
}

export default CreditModal;
