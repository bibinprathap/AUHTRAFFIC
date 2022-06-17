export const parseUrl = (urlString) => {
  let paramString = urlString.split('?')[1]
  let queryString = new URLSearchParams(paramString)
  const values = {}
  for (let pair of queryString.entries()) {
    values[pair[0]] = pair[1]
  }
  return values;
}
