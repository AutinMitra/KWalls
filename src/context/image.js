/** @jsx jsx */
import { Box, jsx } from 'theme-ui'
import { createContext, useEffect, useState, useContext, Fragment } from 'react';
import { navigate } from 'gatsby';

const ImageContext = createContext({});

export const ImageProvider = ({ children }) => {
  const [baseImage, setBaseImage] = useState(null)
  const [kWallImage, setkWallImage] = useState(null)
  const [processing, setProcessing] = useState(false)
  
  const updateBaseImage = urlData => {setBaseImage(urlData)}
  const updateKWallImage = urlData => {setkWallImage(urlData)}
  const updateProcessStatus = status => {setProcessing(status)}

  return (
    <ImageContext.Provider value={{
        hasBaseImage: !!baseImage,
        baseImage,
        kWallImage,
        processing,
        updateBaseImage,
        updateKWallImage,
        updateProcessStatus,
      }}
    >
      {children}
    </ImageContext.Provider>
  )
}

export const useImageInfo = () => useContext(ImageContext)

export const ImageRequiredRoute = ({ children }) => {
  const {hasBaseImage} = useImageInfo()

  useEffect(() => {
    if (!hasBaseImage) navigate('/upload')
  }, [hasBaseImage])

  return <Fragment>{children}</Fragment>
}