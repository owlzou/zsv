import { Modal, Badge } from "@geist-ui/core";
import pkg from "../../package.json";

interface IModal {
  visible: boolean;
  onClose: () => void;
}

function CreditModal(props: IModal) {
  return (
    <Modal visible={props.visible} onClose={props.onClose} width="35rem">
      <Modal.Content>
        <p>
          <b>Z Shader Viewer </b>
          <Badge scale={0.8}>v.{pkg.version}</Badge>
        </p>
        <p>2020 - {new Date().getFullYear()} By owlzou</p>

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
      <Modal.Action passive onClick={props.onClose}>
        关闭
      </Modal.Action>
    </Modal>
  );
}

export default CreditModal;
