'use client';
import React, { useContext, useEffect } from 'react';
import { addCryptoItem, editCryptoItem } from '@/actions/crypto';
import { useForm } from 'react-hook-form';
import { useAuth } from '@clerk/nextjs';
import MyContext from '@/context';

interface FormValues {
  cryptoName: string;
  price: number;
}

export default function CryptoForm() {
  const { selectedItem, setSelectedItem } = useContext(MyContext);

  const { userId } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      cryptoName: '',
      price: 0,
    },
  });

  async function onSubmit(formData: FormValues) {
    if (selectedItem) {
      await editCryptoItem(String(selectedItem.id), {
        name: formData.cryptoName,
        price: formData.price,
      });
      setSelectedItem(null);
    } else {
      await addCryptoItem({
        name: formData.cryptoName,
        price: formData.price,
        userId: userId ? userId : '',
      });
    }

    reset();
  }

  useEffect(() => {
    if (selectedItem) {
      setValue('cryptoName', selectedItem.name || '');
      setValue('price', selectedItem.price || 0);
    }
  }, [selectedItem, setValue]);

  return (
    <div className="flex justify-center items-center pt-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          {selectedItem ? 'Edit Crypto item' : 'Add Crypto'}
        </h2>
        <div className="mb-4">
          <label
            htmlFor="cryptoName"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Crypto Name
          </label>
          <input
            type="text"
            id="cryptoName"
            {...register('cryptoName', {
              required: 'Crypto name is required',
              maxLength: {
                value: 50,
                message: 'Crypto name must be less than 50 characters',
              },
            })}
            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.cryptoName ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.cryptoName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.cryptoName.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Price (USD)
          </label>
          <input
            type="number"
            id="price"
            {...register('price', {
              required: 'Price is required',
              min: {
                value: 0,
                message: 'Price must be a positive number',
              },
            })}
            step="0.01"
            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.price ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
