"use client";
import QuizContext from "@/context/QuizContext";
import { useQuizSearchActive } from "@/store/store";
import { AnimatePresence, motion } from "framer-motion";
import { ChangeEvent, FormEvent, useContext, useState } from "react";

const QuizSearch = ({ quizId }: { quizId: number }) => {
  const [phone, setPhone] = useState<string>("");
  const { setActive } = useQuizSearchActive();

  const { setSearchActive } = useContext(QuizContext).quizSearchActiveContext;

  const { setQuizSearchData } = useContext(QuizContext).quizSearchContext;

  const handleCleanSearch = () => {
    setQuizSearchData(undefined);
    setPhone("");
    setSearchActive(false);
    setActive(false);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value.trim());
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // Prevent the default form submission behavior
      event.preventDefault();
      // Call the function to handle the form submission
      handleSearchSubmit;
    }
  };

  const handleSearchSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `https://sms.turkmentv.gov.tm/api/quiz/${quizId}/search`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phone }),
        }
      );

      // Handle the response as needed

      const data = await response.json();
      setQuizSearchData(data);
      setSearchActive(true);
      setActive(true);
    } catch (error) {}
  };

  return (
    <section className=" md:px-[40px] rounded-[25px] flex flex-col items-center justify-center gap-[40px]">
      <h2 className="text-[28px] leading-[120%] md:text-[40px] font-semibold text-textBlack text-center md:text-left">
        Öz jogaplaryňyzy görüň
      </h2>
      <div className="max-w-[500px] w-full flex flex-col gap-[10px] items-center ">
        <form
          onSubmit={handleSearchSubmit}
          className="bg-fillFormRest  flex border w-full rounded-xl shadow-quizButton"
        >
          <div className="relative rounded-lg rounded-e-none w-full">
            {" "}
            <input
              type="tel"
              className="block w-full h-full rounded-lg rounded-e-none py-3 px-2 md:px-4 text-sm md:text-base leading-[150%] text-textCaptioninform bg-transparent"
              placeholder="Telefon belgiňizi 61 123456 görnüşde giriziň"
              onChange={handleSearchChange}
              value={phone}
              required
              maxLength={8}
              minLength={8}
              onKeyDown={handleKeyPress}
            />
            {phone.length != 0 ? (
              <AnimatePresence>
                <motion.button
                  className="px-4 py-3 absolute right-0 top-[50%] -translate-y-1/2 "
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={handleCleanSearch}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M11.9998 13.4L7.0998 18.3C6.91647 18.4834 6.68314 18.575 6.3998 18.575C6.11647 18.575 5.88314 18.4834 5.6998 18.3C5.51647 18.1167 5.4248 17.8834 5.4248 17.6C5.4248 17.3167 5.51647 17.0834 5.6998 16.9L10.5998 12L5.6998 7.10005C5.51647 6.91672 5.4248 6.68338 5.4248 6.40005C5.4248 6.11672 5.51647 5.88338 5.6998 5.70005C5.88314 5.51672 6.11647 5.42505 6.3998 5.42505C6.68314 5.42505 6.91647 5.51672 7.0998 5.70005L11.9998 10.6L16.8998 5.70005C17.0831 5.51672 17.3165 5.42505 17.5998 5.42505C17.8831 5.42505 18.1165 5.51672 18.2998 5.70005C18.4831 5.88338 18.5748 6.11672 18.5748 6.40005C18.5748 6.68338 18.4831 6.91672 18.2998 7.10005L13.3998 12L18.2998 16.9C18.4831 17.0834 18.5748 17.3167 18.5748 17.6C18.5748 17.8834 18.4831 18.1167 18.2998 18.3C18.1165 18.4834 17.8831 18.575 17.5998 18.575C17.3165 18.575 17.0831 18.4834 16.8998 18.3L11.9998 13.4Z"
                      fill="#BCBCD6"
                    />
                  </svg>
                </motion.button>
              </AnimatePresence>
            ) : null}
          </div>
          <button
            className="bg-fillButtonAccentDefault px-4 py-3 rounded-lg rounded-l-none"
            type="submit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M9.5 3C11.2239 3 12.8772 3.68482 14.0962 4.90381C15.3152 6.12279 16 7.77609 16 9.5C16 11.11 15.41 12.59 14.44 13.73L14.71 14H15.5L20.5 19L19 20.5L14 15.5V14.71L13.73 14.44C12.5505 15.4468 11.0507 15.9999 9.5 16C7.77609 16 6.12279 15.3152 4.90381 14.0962C3.68482 12.8772 3 11.2239 3 9.5C3 7.77609 3.68482 6.12279 4.90381 4.90381C6.12279 3.68482 7.77609 3 9.5 3ZM9.5 5C7 5 5 7 5 9.5C5 12 7 14 9.5 14C12 14 14 12 14 9.5C14 7 12 5 9.5 5Z"
                fill="#fff"
              />
            </svg>
          </button>
        </form>
        <h4 className="text-sm md:text-base text-textLight">
          Her soragyň aşagynda siziň ugradan jogaplaryňyz görkeziler{" "}
        </h4>
      </div>
    </section>
  );
};

export default QuizSearch;
