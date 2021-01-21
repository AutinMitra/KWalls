/** @jsx jsx */
import { Box, Button, Flex, Heading, jsx } from 'theme-ui'
import { Fragment, useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, stagger } from '../animation/animation'
import FileDrop from '../components/drop'
import { useImageInfo } from '../context/image'
import { navigate } from 'gatsby'

const fadeAnim = fadeUp({initScale: 0.9})

const UploadPage = ({data}) => {
  const [dataAsUrl, setDataAsUrl] = useState(null)

  const onDataURLRecieved = useCallback((url) => {
    setDataAsUrl(url)
  }, [])

  const {updateBaseImage} = useImageInfo()

  return (
    <Fragment>
      <Flex
        sx={{
          width: '100%',
          padding: [4, 5, 6],
          alignItems: 'center',
        }}
      >
        <motion.div 
            variants={stagger}
            sx={{
            m: 'auto',
            maxWidth: '500px',
            width: '100%'
          }}
        >
          <motion.div
            key='title' 
            variants={fadeAnim}
          >
            <Heading
              as='h1'
              sx={{
                fontSize: [6, null, 7],
              }}
            >
              Upload
            </Heading>
          </motion.div>
          <motion.div 
            key='subtitle'
            variants={fadeAnim}
          >
            <Heading
              as='h2'
              sx={{
                mt: 2,
                fontSize: [3, null, 4],
                fontWeight: '400'
              }}
            >
              Use an image for k-means.
            </Heading>
          </motion.div>
          <motion.div 
            key='filedrop'
            variants={fadeAnim}
          >
            <FileDrop 
              sx={{
                mt: '1.5rem',
              }} 
              onImageUploaded={onDataURLRecieved}
            />
            <Button
              disabled={!dataAsUrl}
              variant={dataAsUrl ? 'primary' : 'disabled'}
              sx={{
                mt: 4,
                width: '100%'
              }}
              onClick={() => {
                updateBaseImage(dataAsUrl)
                navigate('/process')
              }}
            >
              Continue
            </Button>
          </motion.div>
        </motion.div>
      </Flex>
    </Fragment>
  )
}

export default UploadPage