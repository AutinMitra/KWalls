import '@fontsource/inter/400.css'
import '@fontsource/inter/700.css'

export default {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    body: 'Inter, system-ui, sans-serif',
    heading: 'Inter, system-ui, sans-serif',
    monospace: 'Menlo, monospace',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  colors: {
    text: '#000',
    background: '#e8d5ce',
    primary: '#EA526F',
    secondary: '#202030',
    white: '#EFF6EE',
    muted: '#f6f6f6',
  },
  buttons: {
    primary: {
      p: 3,
      fontWeight: 'bold',
      color: 'white',
      bg: 'primary',
      cursor: 'pointer',
      fontFamily: 'body',
      '&:hover': {
        filter: 'brightness(0.9)',
      },
    },
    secondary: {
      p: 3,
      fontWeight: 'bold',
      color: 'white',
      bg: 'secondary',
      cursor: 'pointer',
      fontFamily: 'body',
      '&:hover': {
        filter: 'brightness(0.9)',
      },
    },
    disabled: {
      p: 3,
      fontWeight: 'bold',
      color: 'white',
      bg: '#EA526F50',
    },
  },
  styles: {
    root: {
      fontFamily: 'body',
      fontWeight: 'body',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
    },
    h1: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 5,
    },
    h2: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 4,
    },
    h3: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 3,
    },
    h4: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 2,
    },
    h5: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 1,
    },
    h6: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 0,
    },
    p: {
      color: 'text',
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body',
    },
    a: {
      color: 'primary',
    },
    pre: {
      fontFamily: 'monospace',
      overflowX: 'auto',
      code: {
        color: 'inherit',
      },
    },
    code: {
      fontFamily: 'monospace',
      fontSize: 'inherit',
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0,
    },
    th: {
      textAlign: 'left',
      borderBottomStyle: 'solid',
    },
    td: {
      textAlign: 'left',
      borderBottomStyle: 'solid',
    },
    img: {
      maxWidth: '100%',
    },
  },
};
