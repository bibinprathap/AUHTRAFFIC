import ApolloClient from 'apollo-boost';
import constant from './constant';

const client = new ApolloClient({
  uri: `${constant.apiurl}/graphql`
});

export default client;
