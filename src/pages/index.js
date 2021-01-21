/** @jsx jsx */
import { Box, Flex, Button, Heading, jsx } from 'theme-ui'
import {Fragment} from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { AnimatePresence, motion } from 'framer-motion'
import { navigate } from 'gatsby'
import { stagger, fadeUp } from '../animation/animation'

const fadeUpConfig = {initScale: 0.8}

const IndexPage = ({data}) => {
  const {
    homewall: {
      childImageSharp: {
        fluid: homewall
      }
    }
  } = data

  return (
    <Fragment>
      <Box
        sx={{
          position: 'fixed',
          zIndex: -1
        }}
      >
        <motion.div
          initial={{scale: 0}}
          animate={{scale: 1}}
          transition={{ease: 'easeOut', duration: 1}}
        >
          <Img 
            fluid={homewall} 
            objectFit='cover'
            position='fixed'
            alt='Home Wallpaper'
            sx={{
              width: '100vw',
              height: '100vh',
            }} 
          />
        </motion.div>
      </Box>
      <Flex
        sx={{
          alignItems: 'center',
          m: 'auto',
          textAlign: 'center',
          width: '100vw',
          height: '100vh',
          bg: 'rgba(255, 255, 255, 0.4)',
          backdropFilter: 'blur(20px)'
        }}
      >
        <AnimatePresence exitBeforeEnter>
        <motion.div
          variants={stagger}
          sx={{
            padding: [4, 5, 6],
            m: 'auto'
          }}
        >
          <motion.div
            variants={fadeUp(fadeUpConfig)}
          >
            <Heading
              as='h1'
              sx={{
                m: 'auto',
                fontSize: [5, 6, 7],
              }}
            >
              KWalls
            </Heading>
          </motion.div>
          <motion.div 
            key='subtitle'
            variants={fadeUp(fadeUpConfig)}
          >
            <Heading
              as='h2'
              sx={{
                mt: 2,
                fontSize: [3, 4, 5],
                fontWeight: '400'
              }}
            >
              Use k-means clustering to generate wallpapers
            </Heading>
          </motion.div>
          <motion.div 
            key='button'
            variants={fadeUp(fadeUpConfig)}
          >
            <Button
              sx={{
                mt: [3, null, 4]
              }}
              onClick={() => {navigate('/upload')}}
            >
              Upload Image
            </Button>
          </motion.div>
        </motion.div>
        </AnimatePresence>
      </Flex>
    </Fragment>
  )
}

export const query = graphql`
  query HomeQuery {
    homewall: file(relativePath: {eq: "homewall.jpg"}) {
      childImageSharp {
        fluid(maxWidth: 1920) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default IndexPage
