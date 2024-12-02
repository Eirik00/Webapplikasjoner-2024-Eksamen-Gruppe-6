"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const PaaMeldingPage = () => {
  const router = useRouter();
  const [numPeople, setNumPeople] = useState<number>(1);
  const [formData, setFormData] = useState<Record<string, string>>({});


  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log(formData);
    router.push('/opprett-arrangement');
  };

  const handleNumPeopleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), 1);
    setNumPeople(value);
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    setFormData((prev) => ({ ...prev, [fieldName]: e.target.value }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Påmelding</h1>
      <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
        <div>
            <label htmlFor="numPeople" className="block mb-2 font-medium">
                Antall Personer:
            </label>
            <input
                type="number"
                id="numPeople"
                min={1}
                value={numPeople}
                onChange={handleNumPeopleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {
            Array.from({ length: numPeople }, (_, index) => (
                <div key={index}>
                    <label className="block mb-2 font-medium">
                        Navn person {index+1}:
                    </label>
                    <input
                        type="text"
                        value={formData[`name${index}`] || ''}
                        onChange={(e) => 
                            handleInputChange(e, `name${index}`)
                        }
                        placeholder={`Navn person ${index}`}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <label className="block mb-2 font-medium">
                        Tlf. person {index+1}:
                    </label>
                    <input
                        type="tel"
                        value={formData[`phone${index}`] || ''}
                        onChange={(e) => 
                            handleInputChange(e, `phone${index}`)
                        }
                        placeholder={`Tlf. person ${index}`}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {index < numPeople - 1 && <hr className="my-4" />}
                </div>
            ))
        }
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
          Lagre Mal
        </button>
      </form>
    </div>
  );
};

export default PaaMeldingPage;

