import { pageUrl } from '@/env';

export const populate = {
  deep: 'populate=deep',
  all: 'populate=*',
};

export const populatedPageUrl = `${pageUrl}?${populate.deep}`;
