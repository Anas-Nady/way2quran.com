interface LocaleProps {
  locale: "ar" | "en";
}

interface PageParams {
  params: LocaleProps;
}

interface SearchParams {
  search: string;
  currentPage: number;
  recitationSlug: string;
  sortBy: string;
  isTopReciter: boolean | string;
}

interface LocalizedEntity {
  arabicName: string;
  englishName: string;
  slug: string;
}

interface SurahVerse {
  id: number;
  textArabic: string;
  textEnglish: string;
}

interface SurahDetails extends LocalizedEntity {
  number: number;
  url: string;
  verses?: SurahVerse[];
}

interface SurahAudioFile {
  surahInfo: SurahDetails;
  surahNumber: number;
  url: string;
  downloadUrl: string;
}

interface ReciterRecitation {
  recitationInfo: LocalizedEntity;
  audioFiles: SurahAudioFile[];
  isCompleted: boolean;
  totalDownloads: number;
  downloadURL?: string;
}

interface ReciterProfile extends LocalizedEntity {
  number: number;
  photo: string;
  recitations?: ReciterRecitation[];
  isTopReciter?: boolean;
  totalRecitations?: number;
  totalViewers?: number;
  createdAt?: string;
}

interface UserMessage {
  senderName: string;
  senderEmail: string;
  content: string;
  slug: string;
  isRead?: boolean;
}

interface UserPopupMessage {
  username: string;
  email: string;
  messageContent: string;
  visible: boolean;
}

interface PaginationDetails {
  currentPage: number;
  totalPages: number;
}

interface SelectOption {
  arabicName: string;
  englishName: string;
  slug: string;
  disabled?: boolean;
}

interface PlayerState {
  isPlaying: boolean;
  isPaused: boolean;
  isPlaylist: boolean;
  currentTrack: string;
  surahIndex: number;
  surahName: string;
  reciterName: string;
  recitationName?: string;
  isExpanded?: boolean;
  surahs: SurahDetails[];
  loopback: boolean;
}
