import Dashboard from '@/components/dashboard/Dashboard';
import { SmsProvider } from '@/context/SmsContext';

const page = () => {
  return (
    <SmsProvider>
      <Dashboard />
    </SmsProvider>
  );
};

export default page;
