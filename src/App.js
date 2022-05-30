import Table from './Table';
import './App.css';
import { useState } from 'react';

const data = [
  {
    invoiceId: "0001",
    invoiceDate: "28th May 2022",
    unitPrice: 100,
    quantity: 10,
    totalAmount: 1000,
    status: "Pending"
  },
  {
    invoiceId: "0002",
    invoiceDate: "28th May 2022",
    unitPrice: 50,
    quantity: 10,
    totalAmount: 500,
    status: "Pending"
  },
  {
    invoiceId: "0003",
    invoiceDate: "28th May 2022",
    unitPrice: 10,
    quantity: 99,
    totalAmount: 990,
    status: "Pending"
  }
]

function App() {
  const [inputData, setInputData] = useState({
    invoiceId: Math.floor(Math.random() * 100000),
    invoiceDate: "",
    unitPrice: "",
    quantity: "",
    totalAmount: "",
    status: "Pending"
  });
  console.log(inputData)
  const formatDate = (date) => {
    return new Date(date).toISOString().split('T')[0];
  }


  const handleOnChange = (field, value) => {
    switch (field) {
      case "invoiceDate":
        setInputData((prevState) => {
          return { ...prevState, invoiceDate: formatDate(value) }
        });
        break;
      case "unitPrice":
        setInputData((prevState) => {
          return { ...prevState, unitPrice: value, totalAmount: prevState.quantity * value }
        });
        break;
      case "quantity":
        setInputData((prevState) => {
          return { ...prevState, quantity: value, totalAmount: prevState.unitPrice * value }
        });
        break;
      case "status":
        setInputData((prevState) => {
          return { ...prevState, status: value }
        });
        break;
      default:
        break;
    }
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    data.push(inputData);
    setInputData({
      invoiceId: Math.floor(Math.random() * 1000),
      invoiceDate: "",
      unitPrice: "",
      quantity: "",
      totalAmount: "",
      status: "Pending"
    })
  }

  return (
    <>
      <header>
        <h1>Invoicer</h1>
      </header>
      <main className="container app">
        <form className='invoice-form' onSubmit={handleOnSubmit}>
          <div className='input-field'>
            <label htmlFor="invoice-date">Invoice Date</label>
            <input
              onChange={(e) => handleOnChange("invoiceDate", e.target.value)}
              value={inputData.invoiceDate}
              id='invoice-date'
              type="date"
              required
            />
          </div>
          <div className='input-field'>
            <label htmlFor="unit-price">Unit Price</label>
            <input
              onChange={(e) => handleOnChange("unitPrice", e.target.value)}
              value={inputData.unitPrice}
              id='unit-price'
              type="number"
              min={0}
              required
            />
          </div>
          <div className='input-field'>
            <label htmlFor="quantity">Quantity</label>
            <input
              onChange={(e) => handleOnChange("quantity", e.target.value)}
              value={inputData.quantity}
              id='quantity'
              type="number" min={1} max={100}
              required
            />
          </div>
          <div className='input-field'>
            <label htmlFor="total-amount">Total amount</label>
            <input
              readOnly
              value={inputData.totalAmount}
              id='total-amount'
              type="number"
            />
          </div>
          <div className='input-field'>
            <label htmlFor="status">Status</label>
            <select
              onChange={(e) => handleOnChange("status", e.target.value)}
              value={inputData.status}
              id="status"
              name="status"
            >
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
            </select>
          </div>
          <div className='input-field'>
            <input type="submit" />
          </div>
        </form>

        <Table data={data} />
      </main>
    </>
  );
}

export default App;
