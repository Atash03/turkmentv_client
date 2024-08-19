import { Queries } from '@/api/queries';
import PageTitle from '@/components/PageTitle';
import MainNews from '@/components/news/MainNews';
import NewsGrid from '@/components/news/NewsGrid';
import Item from '@/components/news/NewsItem';
import Hydrate from '@/utils/HydrateClient';
import getQueryClient from '@/utils/getQueryClient';
import { dehydrate } from '@tanstack/react-query';
import Image from 'next/image';
import StaticImage from '@/public/staticPageImage.jpg';

export async function generateStaticParams() {
  const news = await Queries.getNews(1, { perPage: 20 });

  return news.data.map((item) => ({
    slug: item.id.toString(),
  }));
}

interface IParams {
  params: {
    slug: string;
  };
}

const NewsItemStatic = async ({ params }: IParams) => {
  const queryClient = getQueryClient();

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="news-item">
      <div className="container">
        <Hydrate state={{ dehydratedState }}>
          <div className="news-body py-11">
            <div className="flex flex-col gap-8">
              {/* <NextSeo title={data!.data.title} description={data!.data.excerpt} /> */}
              <div className="flex flex-col gap-2">
                <PageTitle title={'MHB books'} />
                {/* <p className="text-lg">{data?.data.published_at}</p> */}
              </div>

              <div className="main-news flex flex-col gap-6">
                <div className="w-full lg:h-[600px] md:h-[400px] h-[250px] relative">
                  <Image
                    src={StaticImage}
                    alt={'kitaplar'}
                    unoptimized
                    unselectable="off"
                    fill
                    priority
                    className="w-full object-cover h-[600px]"
                  />
                </div>
                <div className="flex flex-col gap-3 text-black text-lg">
                  {/* <h2 className="font-mw_sans font-bold">{data!.data.title}</h2> */}
                  <p className="font-roboto font-normal flex flex-col gap-4 md:text-xl text-lg">
                    Mahabat müdirliginiň neşir önümleri:
                    <br /> 1. 3+ we 5+ ýaşly çagalar üçin Zehin soraglary. Bahasy 23 manat;
                    <br /> 2. Çagalar üçin reňkleme kitaplary. Bahasy: 13 manat;
                    <br /> 3. Ulylar üçin "Sözýetim" güýmenjesi. Bahasy: 10 manat;
                    <br /> 4. Çagalara kompýuter programirleme diline giriş "Başarjaň". Bahasy: 38
                    manat;
                    <br /> 5. Elwan depderim reňkleme kitaby. Bahasy: 28 manat;
                    <br /> 6. 7 ýaşdan ýokary çagalar üçin niýetlenen erteki kitaplary. Bahasy: 8
                    manat;
                    <br />
                    <br />{' '}
                    <a
                      href="https://forms.gle/g6qm76tZihd4conb8"
                      target="_blank"
                      className="text-[#337AB7] font-bold md:text-xl text-lg">
                      Satyn almak üçin şu düwmä basyň!
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Hydrate>
      </div>
    </div>
  );
};

export default NewsItemStatic;
