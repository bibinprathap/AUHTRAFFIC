const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5300';
export const API = {
  getData: baseUrl + '/queryData',
};
