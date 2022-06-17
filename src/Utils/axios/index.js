import axios from 'axios';
import appConstants from 'src/constant';


const { apiurl } = appConstants;

const axiosiInstance = axios.create({
  baseURL: apiurl,
});


export default axiosiInstance;
