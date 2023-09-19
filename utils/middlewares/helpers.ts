import omit from 'lodash/omit';

import { ErrorMessage, GenericObject } from '@/types/page';

export const parseComponent = (component: string) => component.replace('elements.', '');

export const getParams = (params: string[], type: string, prefix: string = '?') => {
  if (!params.length) return '';

  return `${prefix}${type}=${params.join(',')}`;
};

export const getDomFromAttributes = (attributes: any) => {
  if (!attributes) return {};

  const dom = {
    meta: {
      ...omit((attributes.seo ?? {}), 'Meta'),
      content: [],
    },
    content: attributes.content ?? [],
  } as GenericObject;

  const blocks = attributes.Block ?? [];
  const meta = attributes.seo?.Meta ?? [];

  blocks.forEach((block: any) => { 
    if (!block) return;

    const blockName = parseComponent(block.__component);
    const blockContent = omit(block, '__component');

    if (blockName.includes('text-block')) {
      const key = blockName.replace('text-block', 'textBlock');
      dom[key] = [...(dom[key] ?? []), blockContent];
      return;
    }
    
    dom[blockName] = blockContent;
  });
  meta.forEach((metaInfo: any) => {
    if (!metaInfo) return;
    dom['meta']['content'].push({ name: [metaInfo.name], content: metaInfo.content });
  });

  return dom;
};

export const getLocaleAsParam = (locale?: string, prefix: string = '?') => {
  if (!locale) return '';
  return `${prefix}locale=${locale}`;
};

export const throwError = (error: ErrorMessage | string) => {
  const errorMessage = typeof error !== 'string' ? error.message : error;
  throw new Error(errorMessage ?? error);
};
