import { FC, useMemo } from 'react';
import Link from 'next/link';

import { Image, Flex, Text } from '@chakra-ui/react';

import { url } from '@/env';
import { HeaderProps } from '@/types/page';

const Nav: FC<HeaderProps> = ({
  Logo,
  bgColor: backgroundColor,
  textColor: color,
  NavbarOption = [],
  variant = 'light',
}) => {
  const { bgColor, textColor } = useMemo(() => {
    let background = variant === 'light' ? 'aquamarine' : 'blackAlpha.700';
    let text = variant !== 'light' ? 'aquamarine' : 'blackAlpha.700';

    if (variant) return { bgColor: background, textColor: text };

    if (backgroundColor) background = backgroundColor;
    if (color) text = color;

    return { bgColor: background, textColor: text };
  }, [backgroundColor, color, variant]);

  return (
    <Flex
      py="10px"
      px="10px"
      bgColor={bgColor}
      justifyContent={Logo?.data ? 'space-between' : 'flex-end'}
      alignItems="center"
      position="fixed"
      top="0"
      left="0"
      right="0"
      mb="50px"
    >
      {Logo?.data?.url && (
        <Image
          src={`${url}${Logo.data.url}`}
          alt={Logo.data.name}
        />
      )}
      <Flex gap="5px">
        {NavbarOption.map((option) => {
          return (
            <Link key={option.id} href={option.href} passHref>
              <Text
                fontSize="14px"
                color={textColor}
                textTransform="capitalize"
              > 
               {option.label}
              </Text>
            </Link>
          );
        })}
      </Flex>
    </Flex>
  );
}

export default Nav;