import { createContext, useState } from "react";

export const ReceiptContext = createContext();

export const ReceiptContextProvider = ({ children }) => {
    const [receiptData, setReceiptData] = useState({
        businessName: '',
        address: '',
        phone: '',
        documentTitle: '',
        customerName: '',
        customerAddress: '',
        customerPhone: '',
        billNumber: '',
        date: '',
        user: '',
        _24kRate: '',
        silverBhav: '',
        _18kReturn: '',
        _20kReturn: '',
        _22kReturn: '',
        items:[],
    });

    return (
        <ReceiptContext.Provider value={{ receiptData, setReceiptData }}>
            {children}
        </ReceiptContext.Provider>
    );
}