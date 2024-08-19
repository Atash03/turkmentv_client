import TarifWindow from '@/components/auth/TarifWindow';

const Login = () => {
  return (
    <div className="flex flex-row justify-center items-center w-full h-full gap-[42px]">
      <TarifWindow folder={10} days={10} price={10} />
      <TarifWindow folder={1} days={5} price={1} />
    </div>
  );
};

export default Login;
