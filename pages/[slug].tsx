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

const Slug: FC<PageInfo> = ({ data, navbar, meta, footer, textBlock }) => {
  const { query } = useRouter();

  return (
    <Box>
      <Meta {...meta} />
      <Nav {...navbar} />
      <Box mt="50px" mx="10%">
        {textBlock.map((block) => (
          <Blocks key={block.id} layerStyle="divMd" {...block} />
        ))}
        <Flex>
          {data?.map(({ attributes, id }) => {
            const imageUrl = attributes.poster?.data?.attributes?.formats?.thumbnail.url;
            const imageWidth = attributes.poster?.data?.attributes?.formats?.thumbnail.width ?? 200;
            const imageHeight = attributes.poster?.data?.attributes?.formats?.thumbnail.height ?? 350;

            return (
              <Link key={id} href={`${query.slug}/${attributes.Slug}`}>
                <Flex direction="column">
                  {imageUrl && (
                    <Image
                      w={imageWidth}
                      h={imageHeight}
                      src={`${url}${imageUrl}`}
                      alt={attributes.poster?.data?.attributes?.name}
                    />
                  )}
                  <Text mt="4px" fontSize="14px" fontWeight="600">
                    {attributes.Name}
                  </Text>
                  <Text fontSize="13px">
                    {getYear(attributes.Year)}
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
  const fields = ['name', 'year', 'Slug'];
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
