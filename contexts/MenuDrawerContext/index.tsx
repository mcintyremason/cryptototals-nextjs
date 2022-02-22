import { createContext, useState } from 'react'

export const MenuDrawerContext = createContext(null)

export const MenuDrawerProvider: React.FC = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)

  const menuDrawerContext = {
    isDrawerOpen,
    setIsDrawerOpen,
  }

  return (
    <MenuDrawerContext.Provider value={menuDrawerContext}>{children}</MenuDrawerContext.Provider>
  )
}
