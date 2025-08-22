'use client';
import SubsTableItem from '@/Components/AdminComponents/SubsTableItem';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Page = () => {
  const [emails, setEmails] = useState([]);

  const fetchEmails = async () => {
    const response = await axios.get('/api/email');
    setEmails(response.data.emails);
  };

  const deleteEmail = async (mongoId) => {
    const response = await axios.delete('/api/email', {
      params: {
        id: mongoId,
      },
    });

    if (response.data.success) {
      toast.success(response.data.msg);
      fetchEmails();
    } else {
      toast.error('Error');
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white min-h-screen py-10 px-5 sm:px-12 lg:px-28">
      <h1 className="text-3xl font-bold text-indigo-800 mb-6">All Subscriptions</h1>

      <div className="relative max-w-[700px] h-[80vh] overflow-x-auto border border-gray-300 rounded-md bg-white shadow-md">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase bg-indigo-100 text-indigo-800">
            <tr>
              <th scope="col" className="px-6 py-4 font-semibold">
                Email
              </th>
              <th scope="col" className="hidden sm:table-cell px-6 py-4 font-semibold">
                Date
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {emails.map((item, index) => (
              <SubsTableItem
                key={index}
                mongoId={item._id}
                email={item.email}
                date={item.date}
                deleteEmail={deleteEmail}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
