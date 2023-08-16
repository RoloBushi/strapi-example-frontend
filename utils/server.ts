import { getGlobalComponents } from '@/api/api';

export const getServerGlobalProps = async (locale?: string) => {
  const components = await getGlobalComponents(locale);
  return components;
};
