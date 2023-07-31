export default function parseCookies(cookie = ''): { [key: string]: string } {
  return cookie
    .split('; ')
    .map(v => v.split('='))
    .reduce((acc: { [key: string]: string }, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});
}
