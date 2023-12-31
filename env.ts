const url = process.env.NEXT_PUBLIC_URL ?? 'http://localhost:1337';
const apiUrl = `${url}/api`;
const pageUrl = `${apiUrl}/pages`;

export {
  url,
  apiUrl,
  pageUrl,
};
