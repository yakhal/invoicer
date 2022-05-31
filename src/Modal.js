import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

const Modal = (props) => {
    return createPortal(
        <div className={styles.overlay} onClick={props.closeModal}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                {props.children}
            </div>
        </div>,
        document.getElementById("modal-root")
    );
}

export default Modal;