import { FC } from 'react';

import { Box } from '@chakra-ui/react';

import Footer from '@/components/Footer';
import Blocks from '@/components/Blocks';
import Hero from '@/components/Hero';
import Meta from '@/components/Meta';
import Nav from '@/components/Nav';
import { getHomepage } from '@/api/api';
import { HomeInfo } from '@/types/page';
import { getServerGlobalProps } from '@/utils/server';

const Home: FC<HomeInfo> = ({ meta, navbar, footer, header, textBlock }) => (
  <Box pb="150px">
    <Meta {...meta} />
    <Nav {...navbar} />
    {header && <Hero {...header} />}
    {textBlock.map((block) => (
      <Blocks key={block.id} {...block} />
    ))}
    <Footer {...footer} />
  </Box>
);

export async function getServerSideProps(params: any) {
  const homepageInfo = await getHomepage(params?.locale);
  const components = await getServerGlobalProps(params?.locale);

  return {
    props: {
      ...(homepageInfo ?? {}),
      ...(components ?? {}),
    },
  };
}

export default Home;
