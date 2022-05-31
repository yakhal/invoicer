import Table from './Table';
import './App.css';
import { useState } from 'react';
import Modal from './Modal';
import Form from './Form';

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
  // State variables
  
  const [isOpen, setIsOpen] = useState(false);

  const getData = (formData) => {
    data.push(formData)
  }

  const handleClose = () => {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <header>
        <h1>Invoicer</h1>
      </header>
      <main className="container app">
        <div className='create-invoice-container'>
          <button className='create-invoice-button' onClick={handleClose}>Create New Invoice</button>
        </div>
        {isOpen
          &&
          <Modal closeModal={handleClose}>
            <Form closeForm={handleClose} sendData={getData} />
          </Modal>
        }
        <Table data={data} />
      </main>
    </>
  );
}

export default App;
