import TableRecord from "./TableRecord";
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
                <div>Actions</div>
            </div>
            {data.length > 0
                ?
                data.map((record) => {
                    return <TableRecord 
                    deleteInvoice={props.deleteInvoice} 
                    updateInvoice={props.updateInvoice} 
                    key={record._id} 
                    record={record} />
                })
                :
                <TableRecord />
            }
        </div>
    )
}

export default Table;