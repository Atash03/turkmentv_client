const AboutUs = () => {
  return (
    <div className="about-us">
      <h1 className="hidden">About us</h1>
      <div className="container">
        <div className="about-us-inner flex gap-x-8">
          <div className="py-11 flex flex-col gap-6">
            <div className="flex flex-col gap-14 pb-5 border-b border-[#BBBBBB] dark:border-b-black border-solid">
              <h2 className="font-aeroport text-[32px] font-bold text-black transition-all dark:text-white">
                Biz Barada
              </h2>
              <p className="font-mw_sans text-lg font-light text-black transition-all dark:text-white">
                The State Committee of Turkmenistan for Television, Radio Broadcasting and
                Cinematography was established on October 17, 2011 by a decree of the President of
                Turkmenistan. The main task of the Committee is to implement the state policy of
                Turkmenistan in the field of television, radio and film industry.
              </p>
            </div>
            <div className="flex flex-col gap-4 border-b border-[#BBBBBB] dark:border-b-black border-solid pb-5">
              <h5 className="font-aeroport font-normal text-[22px] text-black transition-all dark:text-white">
                There are 8 TV channels within the Committee:
              </h5>
              <ul className="flex flex-col gap-2 font-mw_sans font-light text-black text-lg list-disc pl-7 transition-all dark:text-white">
                <li>Arkadag;</li>
                <li>Altyn Asyr: Turkmenistan;</li>
                <li>Yashlyk;</li>
                <li>Miras;</li>
                <li>Turkmenistan;</li>
                <li>Turkmen Owazy;</li>
                <li>Ashgabat;</li>
                <li>Sport.</li>
              </ul>
            </div>
            <div className="flex flex-col gap-4 border-b border-[#BBBBBB] dark:border-b-black border-solid pb-5">
              <h5 className="font-aeroport font-normal text-black transition-all dark:text-white text-[22px]">
                4 radio channels:
              </h5>
              <ul className="flex flex-col gap-2 font-mw_sans font-light text-black transition-all dark:text-white text-lg list-disc pl-7">
                <li>Watan;</li>
                <li>Chartarapdan;</li>
                <li>Miras;</li>
                <li>Owaz.</li>
              </ul>
            </div>
            {/* <div className="flex flex-col gap-4 border-b border-[#BBBBBB] dark:border-b-black border-solid pb-5"> */}
            <div className="flex flex-col gap-4">
              <p className="font-mw_sans text-lg font-light text-black transition-all dark:text-white">
                In the prosperous period of our sovereign state, it broadcasts widely to promote the
                national values of the Turkmen people, to further develop our culture and art;
              </p>
              <h5 className="font-aeroport font-normal text-black transition-all dark:text-white text-[22px]">
                There are also 4 economic settlements under the State Committee:
              </h5>
              <ul className="flex flex-col gap-2 font-mw_sans text-black transition-all dark:text-white text-lg list-disc pl-7">
                <li> Oguzhan “Turkmenfilm” Association</li>
                <li>“Teleradiomerkezi” State Enterprise</li>
                <li>“Mahabat” advertising company</li>
                <li>School of production</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
