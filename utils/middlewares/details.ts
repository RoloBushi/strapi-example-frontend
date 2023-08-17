import axios from 'axios';

import { apiUrl } from '@/env';

import { populate } from './constants';
import { getLocaleAsParam, throwError } from './helpers';

export const getDetails = async (slug: string, id: string, locale?: string) => {
  try {
    const paramLocale = getLocaleAsParam(locale, '&');
    const { data } = await axios.get(`${apiUrl}/${slug}/${id}?${populate.deep}${paramLocale}`);
    const retrieveData = data?.data?.attributes ?? data;
    
    return { ...(retrieveData ?? {}) };
  } catch (error) {
    throwError(error as any);
  }
};
