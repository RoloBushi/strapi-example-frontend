import { FC } from 'react';

import { Box } from '@chakra-ui/react';

import Footer from '@/components/Footer';
import Blocks from '@/components/Blocks';
import Hero from '@/components/Hero';
import Meta from '@/components/Meta';
import Nav from '@/components/Nav';
import { HomeInfo } from '@/types/page';
import { getHomepage } from '@/utils/middlewares/page';
import { getGlobalComponents } from '@/utils/middlewares/components';

const Home: FC<HomeInfo> = ({ meta, navbar, footer, header, textBlock = []}) => (
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
  const homepageInfo = await getHomepage(params?.query?.locale);
  const components = await getGlobalComponents(params?.query?.locale);

  return {
    props: {
      ...(homepageInfo ?? {}),
      ...(components ?? {}),
    },
  };
}

export default Home;
