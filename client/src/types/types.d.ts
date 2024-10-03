export type LocaleProps = {
  locale: "ar" | "en";
};

export type PageParams = {
  params: LocaleProps;
};

export type SearchParams = {
  search: string;
  currentPage: number;
  recitationSlug: string;
  sortBy: string;
  isTopReciter: boolean | string;
};

export type LocalizedEntity = {
  arabicName: string;
  englishName: string;
  slug: string;
};

export type SurahVerse = {
  id: number;
  textArabic: string;
  textEnglish: string;
};

export type SurahDetails = LocalizedEntity & {
  number: number;
  url: string;
  verses?: SurahVerse[];
};

export type RecitationMetadata = LocalizedEntity & {};

export type SurahAudioFile = {
  surahInfo: SurahDetails;
  surahNumber: number;
  url: string;
  downloadUrl: string;
};

export type ReciterRecitation = {
  recitationInfo: RecitationMetadata;
  audioFiles: SurahAudioFile[];
  isCompleted: boolean;
  totalDownloads: number;
};

export type ReciterProfile = LocalizedEntity & {
  number: number;
  photo: string;
  recitations?: ReciterRecitation[];
  isTopReciter?: boolean;
  totalRecitations?: number;
  totalViewers?: number;
  createdAt?: string;
};

export type UserMessage = {
  senderName: string;
  senderEmail: string;
  content: string;
  slug: string;
  isRead?: boolean;
};

export type UserPopupMessage = {
  username: string;
  email: string;
  messageContent: string;
  visible: boolean;
};

export type PaginationDetails = {
  currentPage: number;
  totalPages: number;
};

export type SelectOption = {
  arabicName: string;
  englishName: string;
  slug: string;
  disabled?: boolean;
};

export interface PlayerState {
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
