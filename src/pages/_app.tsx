import type { AppProps } from 'next/app'
import { ProjectsCtxProvider } from '../context/projectsContext'
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import theme from '../theme'
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider 
      options={{
        useSystemColorMode: true,
      }}>
        <ProjectsCtxProvider>
          <Component {...pageProps} />
        </ProjectsCtxProvider>
      </ColorModeProvider>
    </ChakraProvider>
  
  )
}
export default MyApp;
