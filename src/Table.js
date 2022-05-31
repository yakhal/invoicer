import Record from "./Record";
import styles from "./Table.module.css";

const Table = (props) => {
    const data = props.data;
    return (
        <div className={styles.table}>
            <div className={styles['table-header']}>
                <div>Invoice Number</div>
                <div>Invoice Date</div>
                <div>Unit price</div>
                <div>Quantity</div>
                <div>Total Amount</div>
                <div>Status</div>
            </div>
            {data.map((record) => {
                return <Record key={record.invoiceId} record={record} />
            })}
        </div>
    )
}

export default Table;