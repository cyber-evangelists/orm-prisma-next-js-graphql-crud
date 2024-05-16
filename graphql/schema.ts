export const typeDefs = `#graphql

type Employee {
    id: ID
    name: String
    phone: String
    email: String
    password: String
}

type Query {
  employee(id: ID): Employee
  employees: [Employee]
}

type Mutation {
    addEmployee (name: String, email: String, phone: String, password: String): Employee
    updateEmployee (id: ID!, name: String, email: String, phone: String, password: String): Employee
    deleteEmployee (id: ID!): Employee
}

`;
