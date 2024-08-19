'use client';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { v4 } from 'uuid';
import { BiSolidDownArrow } from 'react-icons/bi';
import { useOnClickOutside } from 'usehooks-ts';

interface ICustomSelect {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  items: string[];
  isBlack?: boolean;
  setValue: (newValue: string) => void;
}

const CustomSelect = ({
  name,
  label,
  placeholder,
  required,
  items,
  setValue,
  isBlack,
}: ICustomSelect) => {
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState<string>();

  useOnClickOutside(ref, () => setOpen(false));
  return (
    <div ref={ref} className="custom-input relative cursor-pointer" onClick={() => setOpen(!open)}>
      {label ? (
        <label
          htmlFor={name}
          className="text-black text-lg px-4 bg-white font-mw_sans absolute -top-[14px] left-[2%]"
          style={isBlack ? { background: '#1a1a1a', color: '#fff' } : {}}>
          {label}
        </label>
      ) : null}
      <input
        readOnly
        type={'text'}
        name={name}
        id={name}
        required={required}
        placeholder={placeholder}
        className="p-5 border border-solid border-[#B2B1B1] rounded-[5px] font-roboto text-[#9A9A9A] text-[22px] w-full pointer-events-none"
        style={isBlack ? { background: '#1a1a1a', color: '#fff' } : {}}
        value={input}
      />
      <motion.div
        className="absolute top-[40%] right-4"
        initial={{ rotate: '0deg' }}
        animate={
          open
            ? {
                rotate: ' 180deg',
                transition: { type: 'tween', duration: 0.4 },
              }
            : { rotate: '0deg', transition: { type: 'tween', duration: 0.4 } }
        }>
        <BiSolidDownArrow color="#B2B1B1" />
      </motion.div>
      <motion.ul
        className="absolute top-[100%] left-0 w-full h-fit bg-white z-20 rounded-[5px] border border-solid overflow-hidden border-[#B2B1B1] max-h-52 overflow-y-auto"
        initial={{ height: '0%' }}
        animate={
          open ? { height: 'fit-content', opacity: '100%' } : { height: '0%', opacity: '0%' }
        }>
        {items.map((item) => (
          <motion.li
            className="p-5 text-[20px] text-black w-full z-30 relative cursor-pointer border-b border-solid border-[#B2B1B1]"
            style={isBlack ? { color: '#fff' } : {}}
            initial={!isBlack ? { background: '#fff' } : { background: '#1a1a1a' }}
            whileHover={!isBlack ? { background: '#dadada' } : { background: '#151515' }}
            onClick={() => {
              setValue(item);
              setInput(item);
            }}
            key={v4()}>
            {item}
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};
export default CustomSelect;
