import { gql } from '@apollo/client';

export const ADD_EMPLOYEE = gql`
  mutation AddEmployee(
    $name: string
    $email: string
    $phone: string
    $password: string
  ) {
    addEmployee(
      name: $name
      email: $email
      phone: $phone
      password: $password
    ) {
      id
      name
      email
      phone
      password
      createdAt
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
      createdAt
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee(
    $id: ID!
    $name: string
    $email: string
    $phone: string
    $password: string
  ) {
    updateEmployee(
      id: $id
      name: $name
      email: $email
      phone: $phone
      password: $password
    ) {
      id
      name
      email
      phone
      password
      updatedAt
    }
  }
`;
