import {gql} from 'apollo-boost';

export const cbQuery = gql`
  query {
  cbs{
  _id
    title
    isactive
  }
}
`;

