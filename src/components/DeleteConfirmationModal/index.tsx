'use client';
import React from 'react';

interface DeleteModalProps {
  onClose: () => void;
  onDelete: () => void;
}

export default function DeleteModal({ onClose, onDelete }: DeleteModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
        <p className="text-lg text-gray-600 mt-2">
          Are you sure you want to delete this item?
        </p>
        <div className="flex justify-end space-x-4 mt-4">
          <button
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
