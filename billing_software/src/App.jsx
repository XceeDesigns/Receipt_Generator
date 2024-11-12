import './App.css'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Dashboard from './components/Dashboard'
import GeneralReceipt from './components/GeneralReceipt'

function App() {
  const receiptData = {
    date: '2024-11-12',
    clientName: 'John Doe',
    clientEmail: 'john@example.com',
    clientAddress: '456 Client Rd, Townsville',
    clientPhone: '987-654-3210',
    items: [
      { description: 'Service A', rate: 1000, qty: 1 },
      { description: 'Service B', rate: 500, qty: 2 }
    ],
    total: 2000,
    notes: 'Thank you for your business!'
  };

  return (
    <>
    {/* <SignUp/> */}
    {/* <SignIn/> */}
    {/* <Dashboard/> */}
    <GeneralReceipt receiptData={receiptData}/>
    </>
  )
}

export default App
