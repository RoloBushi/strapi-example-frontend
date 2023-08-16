import { FC } from 'react';
import Head from 'next/head';

import { url } from '@/env';
import { MetaProps } from '@/types/page';

const Meta: FC<MetaProps> = ({
  image,
  title = '',
  content = [],
  description = '',
}) => {
  const imageUrl = image?.data?.attributes?.url ?  `${url}${image.data.attributes.url}` : null;
  const metaTags = [
    ...(description ? [{ name: 'description', content: description }] : []),
    ...(imageUrl ? [{ name: 'image', content: imageUrl }] : []),
    ...content,
  ];

  return (
    <Head>
      <title>{title}</title>
      {metaTags.map(({ name, content }) => (
        <meta name={name} content={content} key={name} />
      ))}
    </Head>
  );
};

export default Meta;
