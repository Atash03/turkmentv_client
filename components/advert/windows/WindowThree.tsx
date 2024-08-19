'use client';
import { useRouter } from 'next/navigation';
import PresenceAnimator from '@/components/hox/PresenceAnimator';
import CustomInput from '@/components/CustomInput';
import { FormEvent, useContext, useState } from 'react';
import StepsContext from '@/context/StepsContext';
import { FormActionType } from '@/providers/StepsProvider';
import { Queries } from '@/api/queries';
import Button from '@/components/Button';
import Loader from '@/components/Loader';
import { Validator } from '@/utils/validator';

const WindowThree = () => {
  const { form, dispatch } = useContext(StepsContext).addPostContext;
  const [loading, setLoading] = useState<boolean | 'error'>(false);
  const router = useRouter();

  const validateForm = () => {
    if (
      Validator.email(form.customer_email) &&
      Validator.isNotEmpty(form.customer_name) &&
      Validator.phone(form.customer_phone)
    )
      return true;
    else return false;
  };

  if (loading == true) return <Loader height={400} />;

  return (
    <>
      <PresenceAnimator
        initial={{ x: '100%', opacity: '0%' }}
        animate={{ x: '0%', opacity: '100%', transition: { duration: 0.5 } }}
        exit={{ x: '-100%', opacity: '0%', transition: { duration: 0.5 } }}>
        <div className="flex flex-col gap-10">
          <form
            className="flex flex-col gap-6"
            onSubmit={async (e: FormEvent) => {
              e.preventDefault();
              await Queries.postAdvert(form);
            }}>
            <h2 className="font-mw_sans font-[500] leading-[100%] md:text-[22px] text-lg text-black">
              Bukjany sargyt etmek üçin aşakdaky maglumatlary dolduryň
            </h2>
            <CustomInput
              value={{
                value: form.customer_name,
                setValue: (newValue) => dispatch({ type: FormActionType.NAME, payload: newValue }),
              }}
              name="name"
              label="Ady"
              placeholder="Sargyt edijiniň ady ýa-da familiýasy"
              type="text"
              validate={{
                errMsg: 'Name is required',
                isValid: Validator.isNotEmpty(form.customer_name),
              }}
            />
            <CustomInput
              value={{
                value: form.customer_phone,
                setValue: (newValue) => dispatch({ type: FormActionType.PHONE, payload: newValue }),
              }}
              name="phone"
              label="Telefon"
              placeholder="+993 61234567"
              type="text"
              validate={{
                errMsg: 'Invalid phone number',
                isValid: Validator.phone(form.customer_phone),
              }}
            />
            <CustomInput
              value={{
                value: form.customer_phone,
                setValue: (newValue) => dispatch({ type: FormActionType.EMAIL, payload: newValue }),
              }}
              name="email"
              label="E-mail"
              placeholder="meselem@gmail.com"
              type="email"
              validate={{
                errMsg: 'Invalid email address',
                isValid: Validator.email(form.customer_email),
              }}
            />
            <CustomInput
              value={{
                value: form.customer_notes,
                setValue: (newValue) => dispatch({ type: FormActionType.NOTES, payload: newValue }),
              }}
              isTextArea
              name="notes"
              label="Goşmaça bellikler"
              placeholder="Mahabat etmak isleäýän zadyňyzy barada şu ýerik ýazyň..."
              type="text"
            />
            <p className="text-lg font-mw_sans leading-[100%] text-mlightblue">
              Jikme-jiklikleri bize{' '}
              <a href="mailto:mahabat@turkmen.gov.tm" className="underline">
                mahabat@turkmen.gov.tm
              </a>{' '}
              adrese iberiň
            </p>
          </form>
          <Button
            onClick={() => {
              setLoading(true);
              Queries.postAdvert(form)
                .then((res) => {
                  if (res.status === 201) {
                    router.push('/success');
                  }
                })
                .catch(() => {
                  router.push('/failed');
                });
            }}
            name="Indiki"
            type="button"
            disabled={!validateForm()}
          />
        </div>
      </PresenceAnimator>
    </>
  );
};

export default WindowThree;
