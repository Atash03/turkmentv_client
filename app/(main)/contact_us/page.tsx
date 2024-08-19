import ContactForm from '@/components/contact_us/ContactForm';
import ContactMap from '@/components/contact_us/ContactMap';

const Contact = () => {
  return (
    <div>
      <div className="container">
        <div className="inner py-8 max-w-[1000px] w-full m-auto">
          <ContactForm />
          <ContactMap />
        </div>
      </div>
    </div>
  );
};

export default Contact;
