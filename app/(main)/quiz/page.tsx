import QuizMainPage from "@/components/quiz/QuizMainPage";
import React, { Suspense } from "react";

function page() {
  return (
    <Suspense>
      <QuizMainPage />
    </Suspense>
  );
}

export default page;
