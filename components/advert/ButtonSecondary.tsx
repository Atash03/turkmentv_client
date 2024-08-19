import { ButtonHTMLAttributes } from 'react';

interface IProps {
  onClick: () => void;
  name: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

const ButtonSecondary = ({ name, onClick, type = 'button' }: IProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="text-center text-white text-xs font-bold font-roboto p-3 w-[150px] rounded-[4px] border border-solid border-white">
      {name}
    </button>
  );
};
export default ButtonSecondary;
