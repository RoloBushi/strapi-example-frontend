import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Box, Flex, Image, Text } from '@chakra-ui/react';

import Blocks from '@/components/Blocks';
import Footer from '@/components/Footer';
import Meta from '@/components/Meta';
import Nav from '@/components/Nav';
import { url } from '@/env';
import { PageInfo } from '@/types/page';
import { getYear } from '@/utils/helpers/DateHelper';
import { getGlobalComponents } from '@/utils/middlewares/components';
import { getSlugpage } from '@/utils/middlewares/page';

const Slug: FC<PageInfo> = ({ content, navbar, meta, footer, textBlock }) => {
  const { query } = useRouter();

  return (
    <Box>
      <Meta {...meta} />
      <Nav {...navbar} />
      <Box mt="50px" mx="10%">
        {textBlock?.map((block) => (
          <Blocks key={block.id} layerStyle="divMd" {...block} />
        ))}
        <Flex>
          {content?.map(({ poster, Name, Slug, Year, id }) => {
            const imageUrl = poster?.formats?.thumbnail.url;
            const imageWidth = poster?.formats?.thumbnail.width ?? 200;
            const imageHeight = poster?.formats?.thumbnail.height ?? 350;

            return (
              <Link key={id ?? Name} href={`${query.slug}/${Slug}`}>
                <Flex direction="column">
                  {imageUrl && (
                    <Image
                      w={imageWidth}
                      h={imageHeight}
                      src={`${url}${imageUrl}`}
                      alt={poster?.alternativeText ?? poster?.name}
                    />
                  )}
                  <Text mt="4px" fontSize="14px" fontWeight="600">
                    {Name}
                  </Text>
                  <Text fontSize="13px">
                    {getYear(Year)}
                  </Text>
                </Flex>
              </Link>
            )
          })}
        </Flex>
      </Box>
      <Footer {...footer} />
    </Box>
  );
}

export const getServerSideProps = async ({ params }: { params: any }) => {
  const fields = ['Name', 'Year', 'Slug'];
  const populates = ['poster'];

  const slugpage = await getSlugpage(params?.slug ?? '', fields, populates);
  const components = await getGlobalComponents();

  return {
    props: {
      ...(slugpage ?? {}),
      ...(components ?? {}),
    },
  };
}

export default Slug;
