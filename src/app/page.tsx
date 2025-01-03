import { getUserCryptoList } from '@/actions/crypto';
import CryptoForm from '@/components/CryptoForm';
import CryptoListItems from '@/components/CryptoListItems';
import { MyProvider } from '@/context';
import { auth } from '@clerk/nextjs/server';

export default async function CryptoListContent() {
  const user = await auth();
  const { data: initialData } = await getUserCryptoList(user.userId);

  return (
    <MyProvider>
      {!!user.userId && <CryptoForm />}
      {initialData && <CryptoListItems items={initialData} />}
    </MyProvider>
  );
}
