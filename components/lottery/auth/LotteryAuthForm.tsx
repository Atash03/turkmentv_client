"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { FormControl, FormLabel } from "@mui/material";
import { authenticateLottery } from "@/api";

const lotteryAuthSchema = z.object({
  phoneNumber: z.string().regex(/^993\d{8}$/, {
    message: "Dogry telefon belgisini girizin",
  }),
  key: z.string().regex(/^.+-\d{10}$/, {
    message: "Dogry acar sozuni girizin",
  }),
});

const LotteryAuthForm = () => {
  const form = useForm<z.infer<typeof lotteryAuthSchema>>({
    resolver: zodResolver(lotteryAuthSchema),
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof lotteryAuthSchema>) {
    const { phoneNumber, key } = values;
    setIsLoading(true);

    try {
      const response = await authenticateLottery(phoneNumber, key);

      if (response.errorMessage) {
        setError(response.errorMessage);
      } else {
        console.log(response);
        document.cookie = `phoneNumber=${phoneNumber};path=/`;
        document.cookie = `key=${key};path=/`;
        router.replace("/lottery");
      }
    } catch (err) {
      setError("Telefon belgisi ýa-da açar nädogry");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-lightSurfaceContainer rounded-[24px] md:p-[40px] sm:p-[24px] p-[16px] w-[530px] flex flex-col gap-[24px]"
      >
        <h1 className="md:text-display3 sm:text-[32px] text-[24px] font-[500] md:leading-display3">
          Giriş
        </h1>
        <div className="flex flex-col gap-[16px]">
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-[8px]">
                <FormLabel className="font-base-medium text-lightOnSurface">
                  Telefon
                </FormLabel>
                <FormControl>
                  <input
                    {...field}
                    className="px-[16px] py-[12px] bg-lightPrimaryContainer rounded-[12px] outline-none text-lightOnSurfaceVariant text-textSmall leading-textSmall"
                    placeholder="99363XXXXXX"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="key"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-[8px]">
                <FormLabel className="font-base-medium text-lightOnSurface">
                  Açar
                </FormLabel>
                <FormControl>
                  <input
                    {...field}
                    className="px-[16px] py-[12px] bg-lightPrimaryContainer rounded-[12px] outline-none text-lightOnSurfaceVariant text-textSmall leading-textSmall"
                    placeholder="C5-0105639808"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          {error && (
            <p className="text-lightError text-textSmall leading-textSmall">
              {error}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="sm:text-textLarge sm:leading-textLarge text-[16px] leading-[24px] sm:py-[12px] py-[8px] w-full flex justify-center items-center rounded-[12px] bg-lightPrimary font-medium text-lightOnPrimary disabled:opacity-50"
        >
          {isLoading ? "Ýüklenilýär..." : "Giriş"}
        </button>
      </form>
    </Form>
  );
};

export default LotteryAuthForm;
