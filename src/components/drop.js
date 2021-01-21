/** @jsx jsx */
import { Box, Button, Heading, jsx } from 'theme-ui'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

const FileDrop = ({onImageUploaded = () => {}, ...props}) => {
  const onDrop = useCallback(files => {
    const file = files[0]

    // TODO: ERROR MESSAGE
    const validImageTypes = ['image/jpeg', 'image/png'];    
    if (!validImageTypes.includes(file.type)) {
      console.log("NOT AN IMAGE")
      return
    }

    const reader = new FileReader()

    // TODO: ERROR MESSAGE
    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
      onImageUploaded(reader.result)
    }

    reader.readAsDataURL(file)
  }, [onImageUploaded])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <Box
      sx={{
        mt: 3,
        border: '3px dashed',
        borderColor: 'text',
        padding: '2rem',
        backgroundColor: isDragActive ? '#824C7130' : '#ffffff00'
      }}
      {...props}
      {...getRootProps()}
    >
      <input 
        {...getInputProps()} 
        accept="image/*"
        multiple={false} 
      />
      <Box
        sx={{
          m: 'auto',
          textAlign: 'center'
        }}
      >
        <Heading
          as='h3'
        >
          Drag a file here
        </Heading>
        <Heading
          as='h3'
          sx={{
            fontWeight: '400',
            mt: 2,
          }}
        >
          or
        </Heading>
        <Button
          variant='secondary'
          sx={{
            mt: 2
          }}
        >
          Upload
        </Button>
      </Box>
    </Box>
  )
}

export default FileDrop
