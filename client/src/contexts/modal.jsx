import { useState, createContext } from "react";

export const modalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    function setIsOpenWrapper(data) {
        setIsOpen(data);
    }

    return (
        <modalContext.Provider value={{ isOpen, setIsOpenWrapper }}>
            {children}
        </modalContext.Provider>
    )
}