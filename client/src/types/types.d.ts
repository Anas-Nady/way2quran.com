type LocaleProps = {
  locale: "ar" | "en";
};

type PageParams = {
  params: LocaleProps;
};

type SearchParams = {
  search: string;
  currentPage: number;
  recitationSlug: string;
  sortBy: string;
  isTopReciter: boolean | string;
};

type LocalizedEntity = {
  arabicName: string;
  englishName: string;
  slug: string;
};

type SurahVerse = {
  id: number;
  textArabic: string;
  textEnglish: string;
};

type SurahDetails = LocalizedEntity & {
  number: number;
  url: string;
  verses?: SurahVerse[];
};

type RecitationMetadata = LocalizedEntity & {};

type SurahAudioFile = {
  surahInfo: SurahDetails;
  surahNumber: number;
  url: string;
  downloadUrl: string;
};

type ReciterRecitation = {
  recitationInfo: RecitationMetadata;
  audioFiles: SurahAudioFile[];
  isCompleted: boolean;
  totalDownloads: number;
};

type ReciterProfile = LocalizedEntity & {
  number: number;
  photo: string;
  recitations?: ReciterRecitation[];
  isTopReciter?: boolean;
  totalRecitations?: number;
  totalViewers?: number;
  createdAt?: string;
};

type UserMessage = {
  senderName: string;
  senderEmail: string;
  content: string;
  slug: string;
  isRead?: boolean;
};

type UserPopupMessage = {
  username: string;
  email: string;
  messageContent: string;
  visible: boolean;
};

type PaginationDetails = {
  currentPage: number;
  totalPages: number;
};

type SelectOption = {
  arabicName: string;
  englishName: string;
  slug: string;
  disabled?: boolean;
};

interface PlayerState {
  isPlaying: boolean;
  isPaused: boolean;
  currentTrack: string;
  surahNumber: number;
  surahName: string;
  reciterName: string;
  recitationName?: string;
  isExpanded?: boolean;
  surahs: SurahDetails[];
}
