'use client';

import React, { useEffect } from 'react';
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

  useEffect(() => {
    setName(data?.employee?.name);
    setEmail(data?.employee?.email);
    setPhone(data?.employee?.phone);
    setPassword(data?.employee?.password);
  }, [data]);

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
    setIsUpdate(false);
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    console.log(error);
    return <h1>Error...</h1>;
  }
  return (
    <div>
      <div>
        <p className="text-4xl font-bold text-center my-10">Employee</p>
      </div>
      <div className="text-xl text-center">
        <p>
          <span className="font-medium">Name: </span>
          {data?.employee?.name}
        </p>
        <p>
          <span className="font-medium">Email: </span>
          {data?.employee?.email}
        </p>
        <p>
          <span className="font-medium">Phone: </span>
          {data?.employee?.phone}
        </p>
        <p>
          <span className="font-medium">Password: </span>
          {data?.employee?.password}
        </p>
        <p>
          <span className="font-medium">Created at: </span>
          {data?.employee?.createdAt}
        </p>
        {!isUpdate && (
          <button
            className="bg-blue-500 hover:bg-blue-700 mt-4 text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsUpdate(true)}
          >
            Update
          </button>
        )}
      </div>
      {isUpdate && (
        <div className="mt-8 mb-10">
          <div>
            <p className="text-4xl font-bold text-center mb-8">
              Update Employee
            </p>
          </div>
          <form
            onSubmit={handleUpdateEmployee}
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
            <div className="flex gap-4">
              <button
                onClick={() => setIsUpdate(false)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Employee;
