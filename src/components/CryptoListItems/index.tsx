'use client';
import { useContext, useState } from 'react';
import { deleteCryptoItem } from '@/actions/crypto';
import { CryptoItem } from '@/types/supabase';
import { useAuth } from '@clerk/nextjs';
import DeleteModal from '../DeleteConfirmationModal';
import MyContext from '@/context';

export default function CryptoListItems({ items }: { items: CryptoItem[] }) {
  const { userId } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const { setSelectedItem } = useContext(MyContext);

  const handleDeleteClick = (id: string) => {
    setSelectedItemId(id);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedItemId) {
      await deleteCryptoItem(selectedItemId);
      setIsModalOpen(false);
      setSelectedItemId(null);
    }
  };

  return (
    <>
      <ul className="space-y-4 p-4 rounded-lg ">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <div className="flex gap-10 items-center">
              <p className="text-lg font-semibold text-gray-700">{item.name}</p>
              <p className="text-lg text-gray-500">${item.price}</p>
            </div>
            {userId && (
              <div className="flex space-x-2">
                <button
                  className="px-3 py-1 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-md"
                  onClick={() => setSelectedItem(item)}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 text-sm text-white bg-red-500 hover:bg-red-600 rounded-md"
                  onClick={() => handleDeleteClick(String(item.id))}
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
      {isModalOpen && (
        <DeleteModal
          onClose={() => setIsModalOpen(false)}
          onDelete={handleDeleteConfirm}
        />
      )}
    </>
  );
}
