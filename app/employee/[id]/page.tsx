'use client';

import React from 'react';
import { GET_EMPLOYEE } from '../../../graphql/queries';
import { UPDATE_EMPLOYEE } from '../../../graphql/mutations';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';

type Props = {
  params: {
    id: string;
  };
};

const Employee = ({ params: { id } }: Props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);

  const { data, loading, error } = useQuery(GET_EMPLOYEE, {
    variables: { id },
  });

  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE, {
    variables: { id, name, email, phone, password },
    refetchQueries: [
      {
        query: GET_EMPLOYEE,
        variables: { id },
      },
    ],
  });

  const handleUpdateEmployee = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name === '' || email === '' || phone === '' || password === '') return;
    updateEmployee({ variables: { id, name, email, phone, password } });
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>Error...</h1>;
  }
  return (
    <div>
      <div>
        <p>{data?.name}</p>
        <p>{data?.email}</p>
        <p>{data?.phone}</p>
        <p>{data?.password}</p>
        <button onClick={() => setIsUpdate(true)}>Update</button>
      </div>
      {isUpdate && (
        <form onSubmit={handleUpdateEmployee}>
          <input
            value={data.name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
          />
          <input
            value={data.email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
          />
          <input
            value={data.phone}
            onChange={(e) => setPhone(e.target.value)}
            type="phone"
            name="phone"
          />
          <input
            value={data.password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
          />
          <button onClick={() => setIsUpdate(false)}>Cancel</button>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default Employee;
