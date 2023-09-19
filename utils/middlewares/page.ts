import axios from 'axios';
import isEmpty from 'lodash/isEmpty';

import { pageUrl } from '@/env';

import {
  getDomFromAttributes,
  getLocaleAsParam,
  getParams,
  throwError,
} from './helpers';

export const getHomepage = async (locale?: string) => {
  try {
    const { data } = await axios.get(`${pageUrl}/homepage${getLocaleAsParam(locale)}`);
    const dom = getDomFromAttributes(data);

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
    const paramLocale = getLocaleAsParam(locale);
    const fields = getParams(retrieve, 'fields', isEmpty(paramLocale) ? '?': '&');
    const population = getParams(populates, 'populate', isEmpty(fields) ? '?' : '&');

    const { data } = await axios.get(`${pageUrl}/${slug}${paramLocale}${fields}${population}`);
    const dom = getDomFromAttributes(data);
    
    return dom;
  } catch (error) {
    throwError(error as any);
  }
};
