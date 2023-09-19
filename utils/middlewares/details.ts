import axios from 'axios';

import { apiUrl } from '@/env';

import { getLocaleAsParam, throwError } from './helpers';

export const getDetails = async (slug: string, id: string, locale?: string) => {
  try {
    const { data } = await axios.get(`${apiUrl}/${slug}/${id}${getLocaleAsParam(locale)}`);

    return data;
  } catch (error) {
    throwError(error as any);
  }
};
