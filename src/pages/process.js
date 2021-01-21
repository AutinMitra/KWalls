/** @jsx jsx */
import { motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { Box, Button, Flex, Heading, Input, jsx, Label, Text } from 'theme-ui'
import { fadeUp, stagger } from '../animation/animation'
import { ImageRequiredRoute, useImageInfo } from '../context/image'
import KMeansWorker from '../services/algo.worker'

const kMeansWorker = typeof window === 'object' && KMeansWorker()

const fadeUpConfig = {
  delay: 0.2
}

const InputWithLabel = ({onChange, value, label, name, ...props}) => (
  <Box
    {...props}
  >
    <Label 
      htmlFor={name}
      sx={{
        mb: 2,
        fontWeight: 'bold'
      }}
    >
      {label}
    </Label>
    <Input 
      name={name}
      type='number' 
      value={value}
      onChange={onChange}
    />
  </Box>
)

const ProcessPage = ({data}) => {
  const [k, setK] = useState(4)
  const [maxIters, setMaxIters] = useState(100)
  const [canvasRef, setCanvasRef] = useState()
  const [imageLoaded, setImageLoaded] = useState(canvasRef)
  
  const {
    baseImage, 
    kWallImage, 
    processing, 
    updateProcessStatus, 
    updateKWallImage
  } = useImageInfo()

  useEffect(() => {
    if (canvasRef) {
      const currentImage = kWallImage ?? baseImage

      let context = canvasRef.getContext('2d')
      var image = new Image()
      image.src = currentImage
      
      image.onload = () => {
        canvasRef.width = image.width
        canvasRef.height = image.height
        context.drawImage(image, 0, 0) 
        setImageLoaded(true)
      }
    }
  }, [canvasRef, baseImage, kWallImage])

  const resetToBaseImage = useCallback((onLoad = () => {}) => {
    let context = canvasRef.getContext('2d')

    var image = new Image()
    image.src = baseImage
    
    image.onload = () => {
      canvasRef.width = image.width
      canvasRef.height = image.height
      context.drawImage(image, 0, 0) 
      setImageLoaded(true)
      onLoad()
    }
  }, [canvasRef, baseImage])

  const startGeneration = async () => {
    if (canvasRef) {
      let context = canvasRef.getContext('2d')
      updateProcessStatus(true)
      
      resetToBaseImage(async () => {
        let resImageData = await kMeansWorker.kMeansImageData({
          imageData: context.getImageData(0, 0, canvasRef.width, canvasRef.height),
          k,
          maxIters
        })
        context.putImageData(resImageData, 0, 0)
        updateKWallImage(canvasRef.toDataURL('image/png'))

        updateProcessStatus(false)
      })
    }
  }


  return (
    <ImageRequiredRoute>
      <Flex
        sx={{
          width: '100%',
          alignItems: ['start', null, 'center'],
          padding: [3, 4, 5]
        }}
      >
        <Flex
          sx={{
            flexDirection: ['column-reverse', null, 'row'],
            mx: 'auto',
            alignItems: 'center'
          }}
        >
          <motion.div variants={stagger}>
           {imageLoaded && <Box
              mr={[0, null, 5]}
              mt={[4, null, 0]}
            >
              <motion.div variants={fadeUp()}>
                <Heading
                  as='h1'
                  sx={{
                    fontSize: [6, null, 7],
                  }}
                >
                  Process
                </Heading>
              </motion.div>
              <motion.div variants={fadeUp(fadeUpConfig)}>
                <Text
                  sx={{
                    mt: 2,
                    fontSize: [4, 4],
                    fontWeight: '400',
                  }}
                >
                  Tweak hyperparemeters for wallpaper generation.
                </Text>
              </motion.div>
              <motion.div variants={fadeUp(fadeUpConfig)}>
                <Flex
                  sx={{
                    mt: '1.5rem',
                    flexDirection: 'row'
                  }}
                >
                  <InputWithLabel 
                    name='numk'
                    type='number' 
                    value={k}
                    label={'K'}
                    onChange={(e) => setK(e.target.value)}
                    sx={{
                      width: '100%'
                    }}
                  />
                  <InputWithLabel 
                    name='maxIters'
                    type='number' 
                    value={maxIters}
                    label='Number of Iters'
                    onChange={(e) => setMaxIters(e.target.value)}
                    sx={{
                      width: '100%',
                      ml: 3
                    }}
                  />
                </Flex>
              </motion.div>
              <motion.div variants={fadeUp(fadeUpConfig)}>
                <Button
                  onClick={() => {startGeneration()}}
                  variant={processing ? 'disabled' : 'primary'}
                  disabled={processing}
                  sx={{
                    width: '100%',
                    mt: '1.5rem'
                  }}
                >
                  {processing ? `Processing...` : `Generate Wallpaper`}
                </Button>
              </motion.div>
            </Box>}
          </motion.div>
          <motion.div
            initial={{scale: 0}}
            animate={{scale: 1}}
            transition={{ease: 'easeOut', duration: 1}}
            sx={{
              m: 'auto',
              transformOrigin: 'bottom left'
            }}
          >
            <canvas 
              ref={ref => setCanvasRef(ref)}
              sx={{
                maxWidth: '500px',
                width: '100%',
                maxHeight: '500px',
                height: 'auto',
                objectFit: 'cover',
              }}
            />
          </motion.div>
        </Flex>
      </Flex>
    </ImageRequiredRoute>
  )
}

export default ProcessPage
