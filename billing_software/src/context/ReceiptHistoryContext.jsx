import { createContext, useState } from "react";

export const ReceiptHistoryContext = createContext();

export const ReceiptProvider = ({ children }) => {
    const [receiptHistory, setReceiptHistory] = useState([]);
    
    return (
        <ReceiptHistoryContext.Provider value={{ receiptHistory, setReceiptHistory }}>
            {children}
        </ReceiptHistoryContext.Provider>
    );
}