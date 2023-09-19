import { FC } from 'react';

import { Flex, Image, Text } from '@chakra-ui/react';

import { url } from '@/env';

interface AvatarProps {
  size: number | string;
  text: string;
  alt?: string;
  imageUrl?: string;
}

const imageStyle = {
  maxW: '200px',
  maxH: '200px',
  borderRadius: '50%',
  boxShadow: '0px 0px 100px gray'
};

const Avatar: FC<AvatarProps> = ({ imageUrl, size, alt, text }) => {
  if (!imageUrl && text) {
    return (
      <Flex
        w={size}
        h={size}
        justifyContent="center"
        alignItems="center"
        bgColor="gray.500"
        {...imageStyle}
      >
        <Text fontSize="48px" fontWeight="500px" color="whiteAlpha.700">
          {text.split(' ').map((word) => word.slice(0, 1)).join('')}
        </Text>
      </Flex>
    )
  }

  return (
    <Image
      h={size}
      w={size}
      src={`${url}${imageUrl}`}
      alt={alt ?? ''}
      {...imageStyle}
    />
  );
};

export default Avatar;
