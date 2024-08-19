interface IProps {
  name: string;
  width?: string;
  type: 'submit' | 'button' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
}

const Button = (props: IProps) => {
  return (
    <div className="flex justify-end">
      <button
        disabled={props.disabled}
        type={props.type}
        onClick={props.onClick}
        style={props.width ? { width: props.width } : {}}
        className={`min-w-[200px] bg-mlightblue font-roboto font-bold text-lg text-white text-center rounded-five py-2 px-5 flex justify-center flex-shrink-0 h-fit`}>
        {props.name}
      </button>
    </div>
  );
};

export default Button;
