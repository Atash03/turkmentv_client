'use client';
import CustomInput from '@/components/CustomInput';
import Button from '../Button';
import { FormEvent, useState } from 'react';

const ContactForm = () => {
  const [input, setInput] = useState({
    name: '',
    email: '',
    message: '',
    topic: '',
  });
  return (
    <form
      className="custom-input bg-white md:py-12 py-6 md:px-3 px-6 rounded-[10px] border border-solid transition-all border-[#D1D1D1] flex flex-col md:gap-9 gap-6 shadow-form dark:border-0 dark:shadow-none dark:bg-dark"
      onSubmit={(e: FormEvent) => e.preventDefault()}>
      <CustomInput
        value={{
          value: input.name,
          setValue: (value) => setInput({ ...input, name: value }),
        }}
        name="name"
        label="Ady"
        placeholder="Aman Amanow"
        type="text"
      />
      <CustomInput
        value={{
          value: input.email,
          setValue: (value) => setInput({ ...input, email: value }),
        }}
        name="email"
        label="E-mail"
        placeholder="meselem@gmail.com"
        type="email"
      />
      <CustomInput
        value={{
          value: input.message,
          setValue: (value) => setInput({ ...input, message: value }),
        }}
        name="message"
        label="Hat"
        placeholder="Hat"
        isTextArea
      />
      <CustomInput
        value={{
          value: input.topic,
          setValue: (value) => setInput({ ...input, topic: value }),
        }}
        name="topic"
        label="Mowzuk"
        placeholder="Mowzuk"
        type="text"
      />
      {/* <CustomInput name="img" label="Surat" type="file" accept="image/*" /> */}
      <Button name="Ugrat" onClick={() => console.log('click')} type="submit" />
    </form>
  );
};

export default ContactForm;
