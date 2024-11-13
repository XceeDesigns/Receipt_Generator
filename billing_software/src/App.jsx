import './App.css'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Dashboard from './components/Dashboard'
import GeneralReceipt from './components/GeneralReceipt'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  const receiptData = {
    companyName: "XceeDesigns",
    companyLocation: "Ghaziabad, Uttar Pradesh",
    companyPhone: "+91-9582995138",
    companyEmail: "xceedesigns@gmail.com",
    estimateNumber: "EST0001",
    date: "Oct 26, 2024",
    total: "25,498.00",
    clientName: "John Doe",
    clientAddress: "1234 Elm Street, Springfield",
    items: [
      {
        title: "Static Website",
        description: "The package includes five professionally designed web pages...",
        rate: "15,500.00",
        quantity: 1,
        amount: "15,500.00"
      },
      {
        title: "Search Engine Optimization (SEO)",
        description: "The website's initial ranking on Google Chrome...",
        rate: "4,999.00",
        quantity: 1,
        amount: "4,999.00"
      },
      {
        title: "Brochure (5 pages)",
        description: "Prices may vary based on the complexity of the brochure.",
        rate: "4,999.00",
        quantity: 1,
        amount: "4,999.00"
      }
    ],
    notes: "Estimated price was ₹29,997.00, after 15% discount, the chargeable amount is ₹25,498.00."
  };



  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/receipt" element={<GeneralReceipt receiptData={receiptData} />} />
      </Routes>
    </Router>
  )
}

export default App
