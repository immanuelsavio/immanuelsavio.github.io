import { createContext, useContext } from 'react';

export const OrderModalContext = createContext();
export const useOrderModal = () => useContext(OrderModalContext);
