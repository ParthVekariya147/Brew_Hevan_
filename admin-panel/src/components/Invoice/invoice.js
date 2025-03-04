import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Invoice = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get("http://localhost:4000/list"); // Create this API
        setInvoices(response.data);
      } catch (error) {
        console.error("Error fetching invoices:", error);
        toast.error("Error fetching invoices.");
      }
    };

    fetchInvoices();
  }, []);

  const handleDownload = async (invoiceId) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/generate-invoice/${invoiceId}`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice-${invoiceId}.pdf`);
      document.body.appendChild(link);
      link.click();
      toast.success("Invoice downloaded successfully!");
    } catch (error) {
      console.error("Error downloading invoice:", error);
      toast.error("Error downloading invoice.");
    }
  };

  return (
    <div>
      <h2>Invoices</h2>
      {invoices.map((invoice) => (
        <div key={invoice._id}>
          <p>Customer: {invoice.customerName}</p>
          <p>Total: {invoice.totalAmount}</p>
          <button onClick={() => handleDownload(invoice._id)}>
            Download Invoice
          </button>
        </div>
      ))}
      <ToastContainer />
    </div>
  );
};

export default Invoice;
