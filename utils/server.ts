import { getGlobalComponents } from './middlewares/components';

export const getServerGlobalProps = async (locale?: string) => {
  const components = await getGlobalComponents(locale);
  return components;
};
