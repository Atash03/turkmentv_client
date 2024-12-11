export const calculateTimeLeft = (targetDate: string) => {
  const now = new Date();
  const eventDate = new Date(targetDate); // Parse target date directly
  const timeDifference = eventDate.getTime() - now.getTime();

  if (timeDifference <= 0) {
    return { hours: 0, minutes: 0, seconds: 0 }; // Countdown finished
  }

  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  return { hours, minutes, seconds };
};
