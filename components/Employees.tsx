'use client';

import React, { useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { GET_EMPLOYEE, GET_EMPLOYEES } from '../graphql/queries';
import { ADD_EMPLOYEE, DELETE_EMPLOYEE } from '../graphql/mutations';
import { Employee } from '@prisma/client';
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';
import Link from 'next/link';

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

  const { data, loading, error } = useQuery(GETEMPLOYEES);
  const [addEmployee] = useMutation(ADD_EMPLOYEE, {
    variables: { name, email, phone, password },
    refetchQueries: [{ query: GETEMPLOYEES }],
  });

  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
    refetchQueries: [{ query: GETEMPLOYEES }],
  });

  const handleAddEmployee = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name === '' || email === '' || phone === '' || password === '') return;
    addEmployee({ variables: { name, email, phone, password } }).catch((e) =>
      console.log(e)
    );

    setName('');
    setEmail('');
    setPhone('');
    setPassword('');
  };
  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>Error...</h1>;
  }
  const deleteEmployeeHandler = (id: string) => {
    deleteEmployee({ variables: { id } }).catch((e) => console.log(e));
  };

  return (
    <div>
      <div>
        <p className="text-4xl font-bold text-center my-8">Add Employee</p>
      </div>
      <form
        onSubmit={handleAddEmployee}
        autoComplete="off"
        className="flex flex-col items-center justify-center"
      >
        <div className="mb-4">
          <label className="font-medium text-lg" htmlFor="name">
            Name
          </label>
          <input
            className="outline-none border block p-2 mt-2 rounded-md w-96"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
          />
        </div>
        <div className="mb-4">
          <label className="font-medium text-lg" htmlFor="email">
            Email
          </label>
          <input
            className="outline-none border block p-2 mt-2 rounded-md w-96"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
          />
        </div>
        <div className="mb-4">
          <label className="font-medium text-lg" htmlFor="phone">
            Phone
          </label>
          <input
            className="outline-none border block p-2 mt-2 rounded-md w-96"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            name="phone"
          />
        </div>
        <div className="mb-4">
          <label className="font-medium text-lg" htmlFor="password">
            Password
          </label>
          <input
            className="outline-none border block p-2 mt-2 rounded-md w-96"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
      <div>
        <p className="text-4xl font-bold text-center mb-4 mt-10">
          All Employees
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-5 px-20 mt-4 mb-10">
        {data?.employees?.map((item: Employee) => (
          <div
            key={item.id}
            className="shadow-md text-center p-5 rounded-md border"
          >
            <div className="text-lg">
              <p>{item.name}</p>
              <p>{item.email}</p>
              <p>{item.phone}</p>
              <p>
                {item.password.substring(0, 10)}{' '}
                {item.password.length > 10 && '...'}
              </p>
            </div>
            <div className="flex gap-3 mt-3">
              <Link
                href={`/employee/${item.id}`}
                className="bg-blue-500 hover:bg-blue-700 h-10 text-white font-bold py-2 px-4 rounded"
              >
                Details
              </Link>
              <button
                className="bg-red-500 hover:bg-red-700 h-10 text-white font-bold py-2 px-4 rounded"
                onClick={() => deleteEmployeeHandler(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Employees;
