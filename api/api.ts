import axios from 'axios';
import omit from 'lodash/omit';

import { apiUrl, pageUrl } from '@/env';
import { GenericObject } from '@/types/page';

import { populate } from './constants';
import { getParams, parseComponent } from './helpers';

const populatedPageUrl = `${pageUrl}?${populate.deep}`;

const getDomFromAttributes = (attributes: any) => {
  if (!attributes) return {};

  const dom = {
    meta: {
      ...omit((attributes.seo ?? {}), 'Meta'),
      content: [],
    },
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

const getLocaleAsParam = (locale?: string, prefix: string = '?') => {
  if (!locale) return '';
  return `${prefix}locale=${locale}`;
};

export const getHomepage = async (locale?: string) => {
  try {
    const paramLocale = getLocaleAsParam(locale, '&');
    const params = `filters[isHome]=true${paramLocale}`;
    const { data } = await axios.get(`${populatedPageUrl}&${params}`);
    const attributes = (data?.data ?? []).find(Boolean)?.attributes;
    const dom = getDomFromAttributes(attributes);
    
    return dom;
  } catch (error) {
    console.log(error);
  }
}

export const getSlugpage = async (
  slug: string,
  retrieve: string[] = [],
  populates: string[] = [],
  locale: string | undefined = undefined,
) => {
  try {
    const paramLocale = getLocaleAsParam(locale, '&');
    const params = `filters[Slug][$eq]=${slug}${paramLocale}`;
    const { data } = await axios.get(`${populatedPageUrl}&${params}`);
    const attributes = (data?.data ?? []).find(Boolean)?.attributes;
    const domAttributes = getDomFromAttributes(attributes);

    const fields = getParams(retrieve, 'fields');
    const population = getParams(populates, 'populate', !fields.length ? '?' : '&');
    const { data: slugData } = await axios.get(`${apiUrl}/${slug}${fields}${population}${paramLocale}`);
    
    return { ...domAttributes, data: slugData?.data ?? [] };
  } catch (error) {
    console.log(error);
  }
};

export const getDetails = async (slug: string, id: string, locale?: string) => {
  try {
    const paramLocale = getLocaleAsParam(locale, '&');
    const { data } = await axios.get(`${apiUrl}/${slug}/${id}?${populate.deep}${paramLocale}`);
    const retrieveData = data?.data?.attributes ?? data;
    
    return { ...(retrieveData ?? {}) };
  } catch (error) {
    console.log(error);
  }
};

export const getGlobalComponents = async (locale?: string) => {
  try {
    const fields = ['navbar', 'footer'];
    const paramLocale = getLocaleAsParam(locale, '&');
    const requests = fields.map((value) => axios.get(`${apiUrl}/${value}?${populate.deep}${paramLocale}`));
    const responses = await Promise.allSettled(requests);
    const error = responses.some((response) => response.status === 'rejected' && response.reason);
    const components: GenericObject = {};

    if (!error) {
      responses.forEach((response, index) => {
        if (response.status === 'fulfilled' && response.value.data?.data) {
          components[fields[index]] = response.value.data.data?.attributes;
        }
      });
    }

    return components;
  } catch (error) {
    console.log(error);
  }
};
