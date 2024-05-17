import { gql } from '@apollo/client';

export const GET_EMPLOYEES = gql`
  query Employees {
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
    employee(id: $id) {
      id
      name
      email
      phone
      password
    }
  }
`;
