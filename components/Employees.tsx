'use client';

import React, { useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { GET_EMPLOYEES } from '../graphql/queries';
import { ADD_EMPLOYEE } from '../graphql/mutations';
import { Employee } from '@prisma/client';
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';

const GETEMPLOYEES = gql`
  query Employees {
    employees {
      email
      id
      name
      password
      phone
    }
  }
`;

const Employees = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  console.log(GETEMPLOYEES);
  const { data, loading, error } = useQuery(GETEMPLOYEES);
  console.log(data);
  console.log(loading);
  console.log(error);

  const [addEmployee] = useMutation(ADD_EMPLOYEE, {
    variables: { name, email, phone, password },
    refetchQueries: [{ query: GETEMPLOYEES }],
  });

  const handleAddEmployee = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name === '' || email === '' || phone === '' || password === '') return;
    addEmployee({ variables: { name, email, phone, password } });
  };

  if (process.env.NODE_ENV !== 'production') {
    // Adds messages only in a dev environment
    loadDevMessages();
    loadErrorMessages();
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    console.log(error);
    return <h1>Error...</h1>;
  }

  return (
    <div>
      <form onSubmit={handleAddEmployee}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          name="name"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
        />
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          type="phone"
          name="phone"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
        />
        <button type="submit">Submit</button>
      </form>
      <div>
        {data?.map((item: Employee) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
    </div>
  );
};

export default Employees;
