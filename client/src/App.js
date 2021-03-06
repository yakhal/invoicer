import Table from './components/Table';
import { useEffect, useReducer, useState } from 'react';
import Modal from './components/Modal';
import Form from './components/Form';
import Header from './components/Header';
import styles from './App.module.css';

function App() {
  // State variables
  // For Modal
  const [isOpen, handleClose] = useReducer((isOpen) => (!isOpen), false);

  // For Table Data 
  const [data, setData] = useState([]);
  // To add more records in Table
  const getData = (formData) => {
    setData([...data, formData]);
  }

  const deleteInvoice = (invoiceId) => {
    setData(data.filter(record => record._id !== invoiceId));
  }

  const updateInvoice = (formData) => {
    const updatedData = [];
    for (let record of data) {
      if (record._id === formData._id) {
        updatedData.push(formData)
      } else {
        updatedData.push(record);
      }
    }
    setData(updatedData);
  }

  useEffect(() => {
    fetch("/api/data")
      .then((res) => res.json())
      .then((data) => {
        setData(data.records)
      })
      .catch((err) =>
        console.log(err));
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
        </div>
        {isOpen
          &&
          <Modal closeModal={handleClose}>
            <Form closeForm={handleClose} sendData={getData} isEditing={false} />
          </Modal>
        }
        <Table data={data} deleteInvoice={deleteInvoice} updateInvoice={updateInvoice} />
      </main>
    </>
  );
}

export default App;