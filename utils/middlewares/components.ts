import axios from 'axios';

import { apiUrl } from '@/env';
import { GenericObject } from '@/types/page';

import { populate } from './constants';
import { getLocaleAsParam, throwError } from './helpers';

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
    throwError(error as any);
  }
};