import { ButtonHTMLAttributes } from 'react';

interface IProps {
  onClick: () => void;
  name: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  disabled?: boolean;
}
const ButtonPrimary = ({ name, onClick, type, disabled }: IProps) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className="text-center bg-[#37ABE1] text-white text-lg font-bold font-roboto p-3 rounded-[4px] border border-solid border-[#37ABE1] w-full">
      {name}
    </button>
  );
};
export default ButtonPrimary;
