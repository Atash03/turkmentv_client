export default {
  newsItem: (id: string) => `/posts/${id}`,
  pageItem: (id: string) => `/pages/${id}`,
  channelItem: (channel: number) => `/timetable?on_channel=1&channel=${channel}`,
  smallSwiper: (type: string) => `/slider?type=${type}`,
  videos: (search: string) => `/materials${search}`,
  video: (video_id: number) => `/material/${video_id}`,
  plans: (property_id: string) => `/mahabat/${property_id}/bukjalar`,

  // Quiz ==============================================================
  getQuizQuestions: `/quiz/active`,
  getQuiz: (quiz_id: string) => `/quiz/${quiz_id}`,
  getQuizQuestionsWinners: (id: number) => `/quiz/${id}/winners`,
  getQuizQuestionHistory: (id: number) => `/question/${id}/history`,
  // ===================================================================

  // Votes ================================================================
  allVotes: '/voting/show_on_site',
  vote: (vote_id: string) => `/voting/${vote_id}`,
  // ======================================================================

  addPost: '/mahabat/order',
  news: '/pagination/new/posts',
  lastVideos: '/materials?per_page=30',
  categories: '/categories',
  channels: '/channels',
  banner: '/mahabatlar',

  // home: '/mahabatlar?type=home',
  home: '/slider?type=big',
  marquee: '/timetable',
  homeSmallSlider_1: '/slider?type=small',
  homeSmallSlider_2: '/slider?type=small2',
  homeSmallSlider_3: '/slider?type=hazyna',
  homeSmallSlider_4: '/slider?type=mahabat',

  properties: '/mahabat/property-types',

  addViews: (video_id: string) => `material/${video_id}/views/increment`,

  // Sms ========================================================================
  myTvAdmins: '/my-tv-admins',
  messagesByTvAdmin: (id: number) => `/messages-by-tv-admin/${id}`,
};
