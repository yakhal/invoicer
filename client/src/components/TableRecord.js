import styles from "./Table.module.css";
import axios from "axios";
import { MdDeleteOutline } from 'react-icons/md';

const TableRecord = (props) => {
    const record = props.record;

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
                        </div>
                    </>
                    :
                    <div>No Data Exist!</div>
            }
        </div >
    )
}

export default TableRecord;