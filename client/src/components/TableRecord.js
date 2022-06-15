import styles from "./Table.module.css";
import axios from "axios";
import { MdDeleteOutline, MdEdit } from 'react-icons/md';
import { useReducer } from "react";
import Modal from "./Modal";
import Form from "./Form";

const TableRecord = (props) => {
    const record = props.record;
    const [ editForm, toggleEditForm ] = useReducer((editForm) => (!editForm), false);

    const deleteRecord = async (invoiceId, syncFrontend) => {
        try {
            let res = await axios.get(`/api/delete/${invoiceId}`);
            if (res.status === 200) {
                console.log(res.data.message)
                syncFrontend(invoiceId)
            }
        }
        catch (err) {
            console.error(err);
        }
    }

    return (
        <>
        <div className={styles['table-record']} >
            {
                record
                    ?
                    <>
                        <div>{record._id.slice(18)}</div>
                        <div>{record.invoiceDate}</div>
                        <div>{record.unitPrice}</div>
                        <div>{record.quantity}</div>
                        <div>{record.totalAmount}</div>
                        <div>{record.status}</div>
                        <div>
                            <button
                                onClick={() => deleteRecord(record._id, props.deleteInvoice)}
                                className={styles["action-button"]}
                            >
                                <MdDeleteOutline size="1.5em" />
                            </button>
                            <button
                                onClick={toggleEditForm}
                                className={styles["action-button"]}
                            >
                                <MdEdit size="1.5em" />
                            </button>
                        </div>
                    </>
                    :
                    <div>No Data Exist!</div>
            }
        </div >
        {
            editForm
            &&
            <Modal closeModal={toggleEditForm}>
                <Form recievedData={props.record} closeForm={toggleEditForm} updateData={props.updateInvoice} isEditing={true} />
            </Modal>
        }
        </>
    )
}

export default TableRecord;