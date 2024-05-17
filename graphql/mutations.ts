import { gql } from '@apollo/client';

export const ADD_EMPLOYEE = gql`
  mutation Mutation(
    $name: String
    $email: String
    $phone: String
    $password: String
  ) {
    addEmployee(
      name: $name
      email: $email
      phone: $phone
      password: $password
    ) {
      email
      name
      password
      phone
      id
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id) {
      id
      name
      email
      phone
      password
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation Mutation(
    $id: ID!
    $name: String
    $phone: String
    $email: String
    $password: String
  ) {
    updateEmployee(
      id: $id
      name: $name
      phone: $phone
      email: $email
      password: $password
    ) {
      email
      id
      name
      password
      phone
    }
  }
`;
