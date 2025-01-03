'use server';

import { CryptoItem, CryptoItemInsert } from '@/types/supabase';
import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function addCryptoItem(data: CryptoItemInsert) {
  try {
    const { data: insertedData, error } = await supabase
      .from('crypto-item')
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    revalidatePath('/');
    return { data: insertedData as CryptoItem, error: null };
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error inserting data:', error.message);
      return { data: null, error: error.message };
    }
    return {
      data: null,
      error: 'Failed to add cryptocurrency. Please try again.',
    };
  }
}

export async function getUserCryptoList(userId: string | null) {
  try {
    let query = supabase
      .from('crypto-item')
      .select('*')
      .order('created_at', { ascending: false });

    if (userId) {
      query = query.eq('userId', userId);
    }
    const { data, error } = await query;
    if (error) throw error;
    return { data: data as CryptoItem[], error: null };
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching data:', error.message);
      return { data: null, error: error.message };
    }
    return { data: null, error: 'Failed to fetch cryptocurrency list.' };
  }
}

export async function editCryptoItem(
  id: string,
  data: Partial<CryptoItemInsert>
) {
  try {
    const { data: updatedData, error } = await supabase
      .from('crypto-item')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    revalidatePath('/');
    return { data: updatedData as CryptoItem, error: null };
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error editing data:', error.message);
      return { data: null, error: error.message };
    }
    return { data: null, error: 'Failed to edit list item' };
  }
}

export async function deleteCryptoItem(id: string) {
  try {
    const { error } = await supabase.from('crypto-item').delete().eq('id', id);
    if (error) throw error;
    revalidatePath('/');
    return { data: true, error: null };
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error deleting item:', error.message);
      return { data: null, error: error.message };
    }
    return { data: null, error: 'Failed to delete list item' };
  }
}
