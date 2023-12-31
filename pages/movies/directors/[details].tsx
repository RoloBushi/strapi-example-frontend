import { FC } from 'react';
import Link from 'next/link';

import {
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react';

import Avatar from '@/components/image/Avatar';
import Footer from '@/components/Footer';
import Meta from '@/components/Meta';
import Nav from '@/components/Nav';
import { DirectorInfo } from '@/types/page';
import { getYear } from '@/utils/helpers/DateHelper';
import { getGlobalComponents } from '@/utils/middlewares/components';
import { getDetails } from '@/utils/middlewares/details';

const Director: FC<DirectorInfo> = ({ navbar, footer, name, avatar, movies }) => {
  const imageFormat = avatar?.formats?.small;
  const imageUrl = imageFormat?.url ?? avatar?.url;
  const imageWidth = imageFormat?.width ?? avatar?.width;

  return (
    <Box pb="150px" w="90%" mx="auto">
      <Meta id={name} description={name} title={name} content={[]} />
      <Nav {...navbar} />
      <Grid pt="7.5%" gridTemplateColumns="20% 80%">
        <Avatar
          text={name}
          imageUrl={imageUrl}
          size={imageWidth ?? '150px'}
          alt={avatar?.alternativeText ?? name}
        />
        <Text fontSize="32px" fontWeight="600" ml="25px">
          {name}
        </Text>
      </Grid>
      <Divider w="200px" my="60px" borderColor="gray.400" />
      {movies && movies.length > 0 && (
        <Box>
          <Text fontSize="28px" fontWeight="600">Remarcable movies</Text>
          <List>
            {movies.map((movie) => (
              <ListItem key={movie.id ?? movie.Slug} display="flex" alignItems="baseline">
                <Link href={`/movies/${movie.Slug}`} passHref>
                  <Text fontSize="24px" fontWeight="500">
                    {movie.Name}
                  </Text>
                </Link>
                <Text fontSize="16px" ml="2px">
                  - {getYear(movie.Year)}
                </Text>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
      <Footer {...footer} />
    </Box>
  )  
};

export const getServerSideProps = async (params: any) => {
  const details = await getDetails('directors', params?.query?.details, params?.query?.locale);
  const components = await getGlobalComponents();

  return {
    props: {
      ...(details ?? {}),
      ...(components ?? {}),
    },
  };
}


export default Director;
