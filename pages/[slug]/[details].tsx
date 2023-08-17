import { FC } from 'react';
import Link from 'next/link';

import {
  Box, Divider, Flex, Image, Text,
} from '@chakra-ui/react';

import Footer from '@/components/Footer';
import Meta from '@/components/Meta';
import Nav from '@/components/Nav';
import { url } from '@/env';
import { DetailsInfo } from '@/types/page';
import { getYear } from '@/utils/helpers/DateHelper';
import { getGlobalComponents } from '@/utils/middlewares/components';
import { getDetails } from '@/utils/middlewares/details';

const Details: FC<DetailsInfo> = ({
  Name,
  Description,
  Slug,
  Year,
  poster,
  director,
  navbar,
  footer,
}) => {
  const imageUrl = poster?.url ? `${url}${poster.url}` : null;

  return (
    <Box pb="150px">
      <Nav {...navbar} />
      <Meta id={Slug} description={Name} title={Name} content={[]} />
      <Flex my="120px" mx="10%" direction="column" alignItems="center">
        {imageUrl && (
          <Image
            src={imageUrl}
            width={poster?.formats.medium.width ?? '400px'}
            height={poster?.formats.medium.height ?? '550px'}
            alt={poster?.name ?? ''}
          />
        )}
        <Divider my="40px" width="300px" borderColor="gray.500" />
        <Text fontSize="36px" fontWeight="500">
          {Name}
        </Text>
        <Text fontSize="24px" fontWeight="400" my="15px" textAlign="left" w="full">
          Release on {getYear(Year)}
        </Text>
        <Text fontSize="24px" fontWeight="400" my="15px" textAlign="left" w="full">
          Directed by&nbsp;
          <Link href={`/movies/directors/${director?.id}`} passHref>
            <Text as="span" color="blue.300" _hover={{ textDecoration: 'underline' }}>
              {director?.name}
            </Text>
          </Link>
        </Text>
        <Text fontSize="18px">
          {Description}
        </Text>
      </Flex>
      <Footer {...footer} />
    </Box>
  );
}

export const getServerSideProps = async ({ params }: { params: any }) => {
  const category = params.slug;
  const id = params.details;
  const details = await getDetails(category, id);
  const components = await getGlobalComponents();
  const slugDetails = details?.movie ?? details;

  return {
    props: {
      ...(slugDetails ?? {}),
      ...(components ?? {}),
    },
  };
}

export default Details;
