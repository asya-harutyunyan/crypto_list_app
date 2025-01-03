'use client';
import { CryptoItem } from '@/types/supabase';
import { createContext, Dispatch, FC, SetStateAction, useState } from 'react';

type MyContextType = {
  selectedItem: CryptoItem | null;
  setSelectedItem: Dispatch<SetStateAction<CryptoItem | null>>;
};

const MyContext = createContext<MyContextType>({
  selectedItem: null,
  setSelectedItem: () => {},
});

export const MyProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState<CryptoItem | null>(null);

  return (
    <MyContext.Provider
      value={{
        selectedItem,
        setSelectedItem,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;
