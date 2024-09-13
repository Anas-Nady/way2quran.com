const IMAGE_BASE_URL =
  "https://storage.googleapis.com/way2quran_storage/imgs/quran-pdf";

const DOWNLOAD_LINK_BASE_URL =
  "https://storage.googleapis.com/download/storage/v1/b/way2quran_storage/o/quran-pdf";

const listQuranPdf = [
  {
    arabicName: "مصحف التجويد",
    englishName: "Tajweed Quran",
    slug: "tajweed-quran",
    id: 20,
    downloadLink: `${DOWNLOAD_LINK_BASE_URL}%2F%D9%85%D8%B5%D8%AD%D9%81-%D8%A7%D9%84%D8%AA%D8%AC%D9%88%D9%8A%D8%AF.pdf?generation=1725911606693234&alt=media`,
    img: `${IMAGE_BASE_URL}/tajweed.webp`,
  },
  {
    arabicName: "مصحف المدينة المنورة",
    englishName: "Madina Mushaf",
    slug: "madina-mushaf",
    id: 21,
    downloadLink: `${DOWNLOAD_LINK_BASE_URL}%2F%D9%85%D8%B5%D8%AD%D9%81-%D8%A7%D9%84%D9%85%D8%AF%D9%8A%D9%86%D8%A9-%D8%A7%D9%84%D9%85%D9%86%D9%88%D8%B1%D8%A9.pdf?generation=1725911572020202&alt=media`,
    img: `${IMAGE_BASE_URL}/madina.jpeg`,
  },
  {
    arabicName: "مصحف ورش عن نافع",
    englishName: "Warsh Quran",
    slug: "warsh-quran",
    id: 22,
    downloadLink: `${DOWNLOAD_LINK_BASE_URL}%2F%D9%85%D8%B5%D8%AD%D9%81-%D9%88%D8%B1%D8%B4-%D8%B9%D9%86-%D9%86%D8%A7%D9%81%D8%B9.pdf?generation=1725911619589211&alt=media`,
    img: `${IMAGE_BASE_URL}/warsh.jpg`,
  },
  {
    arabicName: "مصحف قالون عن نافع",
    englishName: "Qalun Quran",
    slug: "qalun-quran",
    id: 23,
    downloadLink: `${DOWNLOAD_LINK_BASE_URL}%2F%D9%85%D8%B5%D8%AD%D9%81-%D9%82%D8%A7%D9%84%D9%88%D9%86-%D8%B9%D9%86-%D9%86%D8%A7%D9%81%D8%B9.pdf?generation=1725911634138131&alt=media`,
    img: `${IMAGE_BASE_URL}/qalun.jpg`,
  },
  {
    arabicName: "مصحف شعبة عن عاصم",
    englishName: "Shu'bah Quran",
    slug: "shubah-quran",
    id: 24,
    downloadLink: `${DOWNLOAD_LINK_BASE_URL}%2F%D9%85%D8%B5%D8%AD%D9%81-%D8%B4%D8%B9%D8%A8%D8%A9-%D8%B9%D9%86-%D8%B9%D8%A7%D8%B5%D9%85.pdf?generation=1725911675950521&alt=media`,
    img: `${IMAGE_BASE_URL}/shubah.webp`,
  },
  {
    arabicName: "مصحف الدوري عن الكسائي",
    englishName: "Duri Quran",
    slug: "duri-quran",
    id: 25,
    downloadLink: `${DOWNLOAD_LINK_BASE_URL}%2F%D9%85%D8%B5%D8%AD%D9%81%20-%D8%A7%D9%84%D8%AF%D9%88%D8%B1%D9%8A-%D8%B9%D9%86-%D8%A7%D9%84%D9%83%D8%B3%D8%A7%D8%A6%D9%8A.pdf?generation=1725911624228527&alt=media`,
    img: `${IMAGE_BASE_URL}/duri.jpg`,
  },
  {
    arabicName: "مصحف السوسي عن أبي عمرو",
    englishName: "Susi Quran",
    slug: "susi-quran",
    id: 26,
    downloadLink: `${DOWNLOAD_LINK_BASE_URL}%2F%D9%85%D8%B5%D8%AD%D9%81-%D8%A7%D9%84%D8%B3%D9%88%D8%B3%D9%8A-%D8%B9%D9%86-%D8%A3%D8%A8%D9%8A-%D8%B9%D9%85%D8%B1%D9%88.pdf?generation=1725911712673079&alt=media`,
    img: `${IMAGE_BASE_URL}/susi.jpg`,
  },
  {
    arabicName: "مصحف البزي عن ابن كثير",
    englishName: "Al-Bazzi Quran",
    slug: "al-bazzi-quran",
    id: 27,
    downloadLink: `${DOWNLOAD_LINK_BASE_URL}%2F%D9%85%D8%B5%D8%AD%D9%81-%D8%A7%D9%84%D8%A8%D8%B2%D9%8A-%D8%B9%D9%86-%D8%A7%D8%A8%D9%86-%D9%83%D8%AB%D9%8A%D8%B1.pdf?generation=1725911677478891&alt=media`,
    img: `${IMAGE_BASE_URL}/alBazzi.png`,
  },
  {
    arabicName: "مصحف دولة قطر",
    englishName: "Qatar Mushaf",
    slug: "qatar-mushaf",
    id: 28,
    downloadLink: `${DOWNLOAD_LINK_BASE_URL}%2F%D9%85%D8%B5%D8%AD%D9%81-%D8%AF%D9%88%D9%84%D8%A9-%D9%82%D8%B7%D8%B1.pdf?generation=1725911774161821&alt=media`,
    img: `${IMAGE_BASE_URL}/qatar.jpg`,
  },
  {
    arabicName: "مصحف دولة الكويت",
    englishName: "Kuwait Mushaf",
    slug: "kuwait-mushaf",
    id: 29,
    downloadLink: `${DOWNLOAD_LINK_BASE_URL}%2F%D9%85%D8%B5%D8%AD%D9%81-%D8%AF%D9%88%D9%84%D8%A9-%D8%A7%D9%84%D9%83%D9%88%D9%8A%D8%AA.pdf?generation=1725911800512605&alt=media`,
    img: `${IMAGE_BASE_URL}/kuwait.png`,
  },
  {
    arabicName: "جزء تبارك",
    englishName: "Juz' Tabarak",
    slug: "juz-tabarak",
    id: 30,
    downloadLink: `${DOWNLOAD_LINK_BASE_URL}%2F%D8%AC%D8%B2%D8%A1-%D8%AA%D8%A8%D8%A7%D8%B1%D9%83.pdf?generation=1725911719899414&alt=media`,
    img: `${IMAGE_BASE_URL}/tabarak.webp`,
  },
  {
    arabicName: "جزء قد سمع",
    englishName: "Juz' Qad Samia",
    slug: "juz-qad-samia",
    id: 31,
    downloadLink: `${DOWNLOAD_LINK_BASE_URL}%2F%D8%AC%D8%B2%D8%A1-%D9%82%D8%AF-%D8%B3%D9%85%D8%B9.pdf?generation=1725911698131210&alt=media`,
    img: `${IMAGE_BASE_URL}/qadSamia.png`,
  },
];

export default listQuranPdf;
