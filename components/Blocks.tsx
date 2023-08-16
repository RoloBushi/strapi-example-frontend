import { FC } from 'react';
import ReactMarkdown from 'react-markdown';

import { Box, Flex } from '@chakra-ui/react';

import BaseButton from '@/components/button/Button';
import { url } from '@/env';
import { TextBlockProps } from '@/types/page';
import { getButtonChakraType } from '@/utils/helpers/TypeHelper';

interface BlockProps extends TextBlockProps {
  layerStyle?: string;
}

const Blocks: FC<BlockProps> = ({ id, content, button, layerStyle = 'divSm' }) => (
  <Box
    key={id}
    mx="auto"
    py="2.5%"
    layerStyle={layerStyle}
  >
    <ReactMarkdown transformImageUri={(uri: string) => uri.startsWith(url) ? uri : `${url}${uri}`}>
      {content as string}
    </ReactMarkdown>
    {button && (
      <Flex my="20px" gap="16px" alignItems="center">
        {button.map((btn, index) => (
          <BaseButton
            {...btn}
            key={btn.aria}
            size={index === 0 ? 'lg' : 'md'}
            type={getButtonChakraType(btn.type)}
          />
        ))}
      </Flex>
    )}
  </Box>
);

export default Blocks;
