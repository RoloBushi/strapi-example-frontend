import axios from 'axios';

import { apiUrl } from '@/env';

import { populatedPageUrl } from './constants';
import {
  getDomFromAttributes,
  getLocaleAsParam,
  getParams,
  throwError,
} from './helpers';

export const getHomepage = async (locale?: string) => {
  try {
    const paramLocale = getLocaleAsParam(locale, '&');
    const params = `filters[isHome]=true${paramLocale}`;
    const { data } = await axios.get(`${populatedPageUrl}&${params}`);
    const attributes = (data?.data ?? []).find(Boolean)?.attributes;
    const dom = getDomFromAttributes(attributes);
    
    return dom;
  } catch (error) {
    throwError(error as any);
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
    throwError(error as any);
  }
};
