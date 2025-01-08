interface IProps {
  text: string;
  date: string;
}

const InfoDateAllert = ({ text, date }: IProps) => {
  function formatDate(dateTimeString: string) {
    const [datePart] = dateTimeString.split(' ');
    const [year, month, day] = datePart.split('-');
    return `${day}-${month}-${year}`;
  }

  const readyDate = formatDate(date);

  return (
    <div className="flex gap-[8px] py-3 px-4 text-lightOnInfoAllertContainer bg-lightInfoAllertContainerOutline text-base-medium">
      <span>{text}</span>
      <span>{readyDate}</span>
    </div>
  );
};

export default InfoDateAllert;
