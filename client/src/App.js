import Table from './components/Table';
import { useEffect, useState } from 'react';
import Modal from './components/Modal';
import Form from './components/Form';
import Header from './components/Header';
import styles from './App.module.css';

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

  const [serverMessage, setServerMessage] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setServerMessage(data.message));
  }, []);

  return (
    <>
      <Header />
      <main className={`${styles.container} ${styles["app-main"]}`}>
        <div className={styles['create-invoice-container']}>
          <button className={styles['create-invoice-button']}
            onClick={handleClose}>
            Create New Invoice
          </button>
          <p>{!data ? "Loading..." : serverMessage}</p>
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
