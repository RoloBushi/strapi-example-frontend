import { FC } from 'react';

import { Box, Image, Text } from '@chakra-ui/react';

import { url } from '@/env';
import { HeroProps } from '@/types/page';

const Hero: FC<HeroProps> = ({ title, Subtitle, hero }) => {
  const imageRef = hero?.data?.[0].attributes;
  const imageUrl = imageRef?.url ? `${url}${imageRef.url}` : null;
  
  return (
    <Box py="50px" px="40px" bgColor="black">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={imageRef?.alternativeText ?? imageRef?.name}
          width="full"
        />
      )}
      <Text fontSize="76px" fontWeight="500" mb="6px" color="white">{title}</Text>
      <Text fontSize="24px" color="gray.500" fontStyle="italic">{Subtitle}</Text>
    </Box>
  );
};

export default Hero;
