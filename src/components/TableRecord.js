import styles from "./Table.module.css";

const TableRecord = (props) => {
    const record = props.record;
    return (
        <div className={styles['table-record']}>
            <div>{record.invoiceId}</div>
            <div>{record.invoiceDate}</div>
            <div>{record.unitPrice}</div>
            <div>{record.quantity}</div>
            <div>{record.totalAmount}</div>
            <div>{record.status}</div>
        </div>
    )
}

export default TableRecord;