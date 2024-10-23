import baseUrl from '@/baseUrl';
import { AddPostModel } from '@/models/add.post.model';
import { IAllVotes } from '@/models/allVotes.model';
import { BannerModel } from '@/models/banner.model';
import { CategoriesModel } from '@/models/categories.model';
import { ChannelsModel } from '@/models/channels.model';
import { HomeModel } from '@/models/home.model';
import { LiveDescriptionModel } from '@/models/liveDescription.model';
import { MarqueeModel } from '@/models/marquee.model';
import { NewsModel } from '@/models/news.model';
import { NewsItemModel } from '@/models/newsItem.model';
import { PageItemModel } from '@/models/pageItem.model';
import { PlansModel } from '@/models/plans.model';
import { PropertiesModel } from '@/models/properties.model';
import { IQuizQuestionsHistory } from '@/models/quizQuestionHistory.model';
import { IQuizQuestions } from '@/models/quizQuestions.model';
import { IQuizQuestionsWinners } from '@/models/quizQuestionsWinners.model';
import { MessagesByTvAdmin } from '@/models/sms/messagesByTvAdmis.model';
import { IMyTvAdmins } from '@/models/sms/my.tv.admins.model';
import { VideoModel } from '@/models/video.model';
import { VideosModel } from '@/models/videos.model';
import { IVote } from '@/models/vote.model';
import routes from '@/routes';
import { CloudFog } from 'lucide-react';

export class Queries {
  public static async getNews(
    page: number,
    { perPage = 8 }: { perPage?: number },
  ): Promise<NewsModel> {
    return await fetch(
      `${baseUrl.NEWS_SRC}${routes.news}?locale=tm&count=${perPage}&page=${page}`,
      {
        next: { revalidate: 3600 },
      },
    ).then((res) => res.json().then((res) => res as NewsModel));
  }

  public static async getlastNews(): Promise<NewsModel> {
    return await fetch(`https://turkmentv.gov.tm/v2/api/slider?type=small3`, {
      next: { revalidate: 3600 },
    }).then((res) => res.json().then((res) => res as NewsModel));
  }

  public static async getNewsItem(id: string): Promise<NewsItemModel> {
    return await fetch(`${baseUrl.NEWS_SRC}${routes.newsItem(id)}?locale=tm`, {
      next: { revalidate: 3600 },
    }).then((res) => res.json().then((res) => res as NewsItemModel));
  }

  public static async getCategories(): Promise<CategoriesModel> {
    return await fetch(`${baseUrl.MATERIALS_SRC}${routes.categories}`, {
      next: { revalidate: 3600 },
    }).then((res) => res.json().then((res) => res as CategoriesModel));
  }

  public static async getChannels(): Promise<ChannelsModel> {
    return await fetch(`${baseUrl.MATERIALS_SRC}${routes.channels}`, {
      next: { revalidate: 3600 },
    }).then((res) => res.json().then((res) => res as ChannelsModel));
  }

  public static async getVideos(search: string): Promise<VideosModel> {
    return await fetch(`${baseUrl.MATERIALS_SRC}${routes.videos(search)}`, {
      next: { revalidate: 3600 },
    }).then((res) => res.json().then((res) => res as VideosModel));
  }

  public static async getLastVideos(): Promise<VideosModel> {
    return await fetch(`${baseUrl.MATERIALS_SRC}${routes.lastVideos}`, {
      next: { revalidate: 3600 },
    }).then((res) => res.json().then((res) => res as VideosModel));
  }

  public static async getVideo(id: number): Promise<VideoModel> {
    return await fetch(`${baseUrl.MATERIALS_SRC}${routes.video(id)}`).then((res) =>
      res.json().then((res) => res as VideoModel),
    );
  }

  public static async getPage(id: string): Promise<PageItemModel> {
    return await fetch(`${baseUrl.MATERIALS_SRC}${routes.pageItem(id)}`, {
      next: { revalidate: 3600 },
    }).then((res) => res.json().then((res) => res as PageItemModel));
  }

  public static async getHome(): Promise<HomeModel> {
    return await fetch(`${baseUrl.MATERIALS_SRC}${routes.home}`, {
      next: { revalidate: 3600 },
    }).then((res) => res.json().then((res) => res as HomeModel));
  }

  public static async getSmallSlider1(): Promise<HomeModel> {
    return await fetch(`${baseUrl.MATERIALS_SRC}${routes.homeSmallSlider_1}`, {
      next: { revalidate: 3600 },
    }).then((res) => res.json().then((res) => res as HomeModel));
  }
  public static async getSmallSlider2(): Promise<HomeModel> {
    return await fetch(`${baseUrl.MATERIALS_SRC}${routes.homeSmallSlider_2}`, {
      next: { revalidate: 3600 },
    }).then((res) => res.json().then((res) => res as HomeModel));
  }
  public static async getSmallSlider3(): Promise<HomeModel> {
    return await fetch(`${baseUrl.MATERIALS_SRC}${routes.homeSmallSlider_1}`, {
      next: { revalidate: 3600 },
    }).then((res) => res.json().then((res) => res as HomeModel));
  }
  public static async getSmallSlider4(): Promise<HomeModel> {
    return await fetch(`${baseUrl.MATERIALS_SRC}${routes.homeSmallSlider_2}`, {
      next: { revalidate: 3600 },
    }).then((res) => res.json().then((res) => res as HomeModel));
  }

  public static async getMarquee(): Promise<MarqueeModel> {
    return await fetch(`${baseUrl.MATERIALS_SRC}${routes.marquee}?on_morquee=1`, {
      next: { revalidate: 3600 },
    }).then((res) => res.json().then((res) => res as MarqueeModel));
  }

  public static async getBanner(): Promise<BannerModel> {
    return await fetch(`${baseUrl.MATERIALS_SRC}${routes.banner}`, {
      next: { revalidate: 3600 },
    }).then((res) => res.json().then((res) => res as BannerModel));
  }

  public static async getLiveDescription(channel: number): Promise<LiveDescriptionModel> {
    return await fetch(`${baseUrl.MATERIALS_SRC}${routes.channelItem(channel)}`, {
      next: { revalidate: 3600 },
    }).then((res) => res.json().then((res) => res as LiveDescriptionModel));
  }

  public static async getProperties(): Promise<PropertiesModel> {
    return await fetch(`${baseUrl.API_SRC}${routes.properties}`, {
      next: { revalidate: 3600 },
    }).then((res) => res.json().then((res) => res as PropertiesModel));
  }

  public static async getPlans(property_id: number): Promise<PlansModel> {
    return await fetch(`${baseUrl.API_SRC}${routes.plans(String(property_id))}`, {
      next: { revalidate: 3600 },
    }).then((res) => res.json().then((res) => res as PlansModel));
  }

  public static async postAdvert(data: AddPostModel): Promise<Response> {
    return await fetch(`${baseUrl.API_SRC}${routes.addPost}`, {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-cache',
      body: JSON.stringify(data),
      method: 'POST',
    });
  }

  // Quiz fetching ===========================================================================
  public static async getQuizQuestions(): Promise<IQuizQuestions> {
    return await fetch(`${baseUrl.QUIZ_SRC}${routes.getQuizQuestions}`, {
      next: { revalidate: 3600 },
    }).then((res) => res.json().then((res) => res as IQuizQuestions));
  }

  public static async getQuiz(quiz_id: string): Promise<IQuizQuestions> {
    return await fetch(`${baseUrl.QUIZ_SRC}${routes.getQuiz(quiz_id)}`, {
      next: { revalidate: 3600 },
    }).then((res) => res.json().then((res) => res as IQuizQuestions));
  }

  public static async getQuizHistory(id: number): Promise<IQuizQuestionsHistory> {
    return await fetch(`${baseUrl.QUIZ_SRC}${routes.getQuizQuestionHistory(id)}`, {
      next: { revalidate: 3600 },
    }).then((res) => res.json().then((res) => res as any));
  }

  public static async getQuizWinners(id: number): Promise<IQuizQuestionsWinners> {
    return await fetch(`${baseUrl.QUIZ_SRC}${routes.getQuizQuestionsWinners(id)}`, {
      next: { revalidate: 3600 },
    }).then((res) => res.json().then((res) => res as IQuizQuestionsWinners));
  }

  // ======================================================================================

  // Votes ================================================================================
  public static async getAllVotes(): Promise<IAllVotes> {
    return await fetch(`${baseUrl.QUIZ_SRC}${routes.allVotes}`, {
      next: { revalidate: 3600 },
    }).then((res) => res.json().then((res) => res as IAllVotes));
  }

  public static async getVote(vote_id: string): Promise<IVote> {
    return await fetch(`${baseUrl.QUIZ_SRC}${routes.vote(vote_id)}`, {
      next: { revalidate: 3600 },
    }).then((res) => res.json().then((res) => res as IVote));
  }

  // ============================================================================================

  // Sms ========================================================================================
  public static async getAdmins(): Promise<IMyTvAdmins> {
    const token = localStorage.getItem('access_token');

    return await fetch(`${baseUrl.SMS_SRC}${routes.myTvAdmins}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => res.json().then((res) => res as IMyTvAdmins));
  }

  public static async getMessages(
    id: number,
    current_page: number,
    dateValue: string,
    activeSort: string,
    searchFetch: string,
  ): Promise<MessagesByTvAdmin> {
    const token = localStorage.getItem('access_token');

    return await fetch(
      `${baseUrl.SMS_SRC}${routes.messagesByTvAdmin(id)}?per_page=60&page=${current_page}${
        dateValue ? '&filter_by_date=' + dateValue.toString() : ''
      }${searchFetch ? '&search=' + searchFetch : ''}&order=${activeSort}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    ).then((res) => res.json().then((res) => res as MessagesByTvAdmin));
  }
}
