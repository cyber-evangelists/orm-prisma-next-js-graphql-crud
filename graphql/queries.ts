import { gql } from '@apollo/client';

export const GET_EMPLOYEES = gql`
  query {
    employees {
      id
      name
      email
      phone
      password
    }
  }
`;

export const GET_EMPLOYEE = gql`
  query Employee($id: ID!) {
    employee {
      id
      name
      email
      phone
      password
      createdAt
    }
  }
`;
