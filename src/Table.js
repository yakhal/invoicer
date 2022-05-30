import Record from "./Record";

const Table = (props) => {
    const data = props.data;
    return (
        <div className="table">
            <div className='table-header'>
                <div>Invoice Number</div>
                <div>Invoice Date</div>
                <div>Unit price</div>
                <div>Quantity</div>
                <div>Total Amount</div>
                <div>Status</div>
            </div>
            {data.map((record) => {
                return <Record key={Math.random()} record={record} />
            })}
        </div>
    )
}

export default Table;