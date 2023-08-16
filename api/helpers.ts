export const parseComponent = (component: string) => component.replace('elements.', '');

export const getParams = (params: string[], type: string, prefix: string = '?') => {
  if (!params.length) return '';

  const formattedParams = params
    .map((param, index) => `${type}[${index}]=${param}`)
    .join('&');

  return `${prefix}${formattedParams}`;
};
