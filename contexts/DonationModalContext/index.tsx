import { createContext, useState } from 'react'

export const DonationModalOpenContext = createContext(false)
export const SetDonationModalOpenContext = createContext(null)

export const DonationModalContextProvider: React.FC = ({ children }) => {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState<boolean>(false)

  return (
    <DonationModalOpenContext.Provider value={isDonationModalOpen}>
      <SetDonationModalOpenContext.Provider value={setIsDonationModalOpen}>
        {children}
      </SetDonationModalOpenContext.Provider>
    </DonationModalOpenContext.Provider>
  )
}
