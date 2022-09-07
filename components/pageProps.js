import { createContext, useContext } from 'react'

export const PageProps = createContext({})

export const PagePropsProvider = ({ children, pageProps }) => {
  return (
    <PageProps.Provider value={pageProps}>
      {children}
    </PageProps.Provider>
  )
}

export const usePageProps = () => useContext(PageProps)
