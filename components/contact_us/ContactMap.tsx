import ContactDetails from '../ContactDetails';
import Map from '../Map';

const ContactMap = () => {
  return (
    <div className="contact-map flex md:flex-row flex-col gap-9 border-t border-t-[#BBBBBB] pt-11 mt-14 dark:border-dark transition-all">
      <ContactDetails />
      <Map />
    </div>
  );
};

export default ContactMap;
