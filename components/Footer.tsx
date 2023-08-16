import { FC } from 'react';
import { BsInstagram } from 'react-icons/bs';

import { IconButton, Flex, Text } from '@chakra-ui/react';

import { FooterProps, GenericObject } from '@/types/page';
import { getYear } from '@/utils/helpers/DateHelper';

const commonIcons: GenericObject = {
  instagram: <BsInstagram />,
};

const Footer: FC<FooterProps> = ({ SocialMediaButton, disclaimerText}) => (
  <Flex
    py="50px"
    px="40px"
    bgColor="aquamarine"
    justifyContent="space-between"
    alignItems="center"
    position="fixed"
    bottom="0"
    left="0"
    right="0"
  >
    <Text fontSize="18px" color="gray.500">{disclaimerText}</Text>
    <Text fontSize="16px" color="gray.500">
      {getYear()}
    </Text>
    <Flex gap="5px">
      {SocialMediaButton?.map((button) => {
        const aria = button.ariaLabel ?? button.aria;

        return (
          <IconButton
            key={aria}
            aria-label={aria ?? ''}
            icon={aria ? commonIcons[aria] : null}
            variant={button.variant ?? 'unstyled'}
            color="purple.300"
            onClick={() => window.open(button.href, button.target ?? '_blank')}
            _hover={{ bgColor: 'inherit', color: 'purple.500' }}
          />
        );
      })}
    </Flex>
  </Flex>
);

export default Footer;
