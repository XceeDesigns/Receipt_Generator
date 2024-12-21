import './App.css'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Dashboard from './components/Dashboard'
import GeneralReceipt from './components/GeneralReceipt'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import JewellerReceipt from './components/JewellerReceipt'
import RoughEstimate from './components/RoughEstimate'
import Choice from './components/Choice'
import ReceiptHistory from './pages/ReceiptHistory'
import { ReceiptProvider } from './context/ReceiptHistoryContext'
import { ReceiptContextProvider } from './context/ReceiptContext'
import { UserContextProvider } from './context/UserContext'
import {Toaster} from 'react-hot-toast'
import MainDashboard from './pages/MainDashboard'

function App() {

  return (
    <Router>
      <ReceiptProvider>
        <ReceiptContextProvider>
          <UserContextProvider>
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/choose" element={<Choice />} />
              <Route path="/main-dashboard" element={<MainDashboard />} />
              <Route path="/dashboard/general" element={<Dashboard />} />
              <Route path="/dashboard/estimate" element={<RoughEstimate />} />
              <Route path="/dashboard/g/preview" element={<GeneralReceipt />} />
              <Route path="/dashboard/e/preview" element={<JewellerReceipt />} />
              <Route path="/receipt-history" element={<ReceiptHistory />} />
            </Routes>
            <Toaster />
          </UserContextProvider>
        </ReceiptContextProvider>
      </ReceiptProvider>
    </Router>
  )
}

export default App
