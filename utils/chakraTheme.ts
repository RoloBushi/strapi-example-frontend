import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        fontWeight: '400',
        borderRadius: '8px',
        color: 'white',
      },
      sizes: {
        xl: {
          h: '56px',
          fontSize: 'lg',
          px: '32px',
        },
        full: {
          w: 'full',
        },
      },
      variants: {
        primary: {
          bgColor: 'blue.500',
        },
        secondary: {
          bgColor: 'gray.500',
        }
      },
      // 6. We can overwrite defaultProps
      defaultProps: {
        variant: 'primary', // default is solid
      },
    },
  },
  layerStyles: {
    divSm: {
      maxW: { base: '100%', lg: '60%', xl: '750px' },
    },
    divMd: {
      maxW: { base: '100%', lg: '80%', xl: '1200px' },
    },
    divLg: {
      maxW: '100%',
      w: '100%',
    },
  },
})

export default theme;