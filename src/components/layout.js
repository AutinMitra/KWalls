/** @jsx jsx */
import { Flex, Styled, jsx } from 'theme-ui'
import { AnimatePresence, motion } from 'framer-motion'
import { ImageProvider } from '../context/image'

const Layout = ({location, children, ...props}) => {
  return (
    <ImageProvider>
      <AnimatePresence exitBeforeEnter>
        <motion.main 
          initial='initial' 
          animate='animate' 
          exit={{opacity: 0}}
          key={location.pathname}
        >
          <Styled.root {...props}>
            <Flex
              sx={{
                minHeight: '100vh',
              }}
            >
              {children}
            </Flex>
          </Styled.root>
        </motion.main>
      </AnimatePresence>
    </ImageProvider>
  )
}

export default Layout
