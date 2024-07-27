const IMAGE_BASE_URL =
  "https://storage.googleapis.com/way2quran_storage/imgs/quran-pdf";

const DOWNLOAD_LINK_BASE_URL = "https://drive.google.com/file";

const listQuranPdf = [
  {
    arabicName: "مصحف التجويد",
    englishName: "Tajweed Quran",
    id: 20,
    downloadLink: `${DOWNLOAD_LINK_BASE_URL}/d/1pYbbUcdKh7yC_rSJbVPMqIh6oYacUc9t/view?usp=sharing}`,
    img: `${IMAGE_BASE_URL}/tajweed.webp`,
  },
  {
    arabicName: "مصحف المدينة المنورة",
    englishName: "Madina Mushaf",
    id: 21,
    downloadLink: `${DOWNLOAD_LINK_BASE_URL}/d/1bfYBkiBn32U1nSHizdkMfqQKLectV5yT/view?usp=sharing}`,
    img: `${IMAGE_BASE_URL}/madina.jpeg`,
  },
  {
    arabicName: "مصحف ورش عن نافع",
    englishName: "Warsh Quran",
    id: 22,
    downloadLink: `${DOWNLOAD_LINK_BASE_URL}/d/1o9U4V4wYnNFxS0orFX7cStrYVdfTouOI/view?usp=sharing}`,
    img: `${IMAGE_BASE_URL}/warsh.jpg`,
  },
  {
    arabicName: "مصحف قالون عن نافع",
    englishName: "Qalun Quran",
    id: 23,
    downloadLink: `${DOWNLOAD_LINK_BASE_URL}/d/1MR4mdFDF7yMVx5oTOD0ObWT9YqYeVEDG/view?usp=sharing}`,
    img: `${IMAGE_BASE_URL}/qalun.jpg`,
  },
  {
    arabicName: "مصحف شعبة عن عاصم",
    englishName: "Shu'bah Quran",
    id: 24,
    downloadLink: `${DOWNLOAD_LINK_BASE_URL}/d/12K4eGiSUSvp365efjYXgAPiCRhBmoJXF/view?usp=sharing}`,
    img: `${IMAGE_BASE_URL}/shubah.webp`,
  },
  {
    arabicName: "مصحف الدوري عن الكسائي",
    englishName: "Duri Quran",
    id: 25,
    downloadLink: `${DOWNLOAD_LINK_BASE_URL}/d/1TxEEDqJnBShwhxJ2uf3XzjB1JvTEZ194/view?usp=sharing}`,
    img: `${IMAGE_BASE_URL}/duri.jpg`,
  },
  {
    arabicName: "مصحف السوسي عن أبي عمرو",
    englishName: "Susi Quran",
    id: 26,
    downloadLink: `${DOWNLOAD_LINK_BASE_URL}/d/1z_X0fXrTXPOLyt_RurkK9zLFXjCJ6fQA/view?usp=sharing}`,
    img: `${IMAGE_BASE_URL}/susi.jpg`,
  },
  {
    arabicName: "مصحف البزي عن ابن كثير",
    englishName: "Al-Bazzi Quran",
    id: 27,
    downloadLink: `${DOWNLOAD_LINK_BASE_URL}/d/1vjSpO_W-1TlkXJhwm4-j0Jcz9aDqD3cE/view?usp=sharing}`,
    img: `${IMAGE_BASE_URL}/alBazzi.png`,
  },
  {
    arabicName: "مصحف دولة قطر",
    englishName: "Qatar Mushaf",
    id: 28,
    downloadLink: `${DOWNLOAD_LINK_BASE_URL}/d/1gqDBzq7YorVXovmv9AOIbAgTVDbSagqY/view?usp=sharing}`,
    img: `${IMAGE_BASE_URL}/qatar.jpg`,
  },
  {
    arabicName: "مصحف دولة الكويت",
    englishName: "Kuwait Mushaf",
    id: 29,
    downloadLink: `${DOWNLOAD_LINK_BASE_URL}/d/1YtaQXazDU7IbDEmlyoyV4trcRMIGtyxj/view?usp=sharing}`,
    img: `${IMAGE_BASE_URL}/kuwait.png`,
  },

  {
    arabicName: "جزء تبارك",
    englishName: "Juz' Tabarak",
    id: 30,
    downloadLink: `${DOWNLOAD_LINK_BASE_URL}/d/1IPYP1OGGNn8T4kBIgHd2zxTHguYdlGpk/view?usp=sharing}`,
    img: `${IMAGE_BASE_URL}/tabarak.webp`,
  },
  {
    arabicName: "جزء قد سمع",
    englishName: "Juz' Qad Samia",
    id: 31,
    downloadLink: `${DOWNLOAD_LINK_BASE_URL}/d/1V5GQdhgZy2XuH_Bwa4ZwlTOih-1FcVIj/view?usp=sharing}`,
    img: `${IMAGE_BASE_URL}/qadSamia.png`,
  },
];
export default listQuranPdf;
