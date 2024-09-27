export const HAFS_AN_ASIM = "hafs-an-asim";
export const COMPLETED_RECITATIONS = "full-holy-quran";
export const VARIOUS_RECITATIONS = "various-recitations";

const RECITATIONS_LIST = [
  {
    arabicName: "المصحف الكامل",
    englishName: "Full Holy Quran",
    slug: COMPLETED_RECITATIONS,
  },
  {
    arabicName: "التلاوات المنوعة",
    englishName: "Various Recitations",
    slug: VARIOUS_RECITATIONS,
  },
  {
    arabicName: "حفص عن عاصم",
    englishName: "Hafs An Asim",
    slug: HAFS_AN_ASIM,
  },
  {
    arabicName: "إسحاق الوراق وإدريس الحداد عن خلف البزار",
    englishName: "Ishaq al-Waraq and Idris al-Haddad from behind Al-Bazr",
    slug: "ishaq-al-waraq-and-idris-al-haddad-from-behind-al-bazr",
  },
  {
    arabicName: "أبي الحارث عن الكسائي",
    englishName: "Abi al-Harith an Al-Kisai",
    slug: "abi-al-harith-an-al-kisai",
  },
  {
    arabicName: "الدوري عن أبي عمرو",
    englishName: "Ad-Duri an Abu Amr",
    slug: "ad-duri-an-abu-amr",
  },
  {
    arabicName: "الدوري عن الكسائي",
    englishName: "Ad-Duri an Al-Kisai",
    slug: "ad-duri-an-al-kisai",
  },
  {
    arabicName: "البزي عن ابن كثير",
    englishName: "Al-Bazzi an Ibn Kathir",
    slug: "al-bazzi-an-ibn-kathir",
  },
  {
    arabicName: "البزي وقنبل عن ابن كثير",
    englishName: "Al-Bazzi wa Qunbul an Ibn Kathir",
    slug: "al-bazzi-wa-qunbul-an-ibn-kathir",
  },
  {
    arabicName: "السوسي عن أبي عمرو",
    englishName: "As-Susi an Abu Amr",
    slug: "as-susi-an-abu-amr",
  },
  {
    arabicName: "حفص عن عاصم من طريق الطيبة",
    englishName: "Hafs an Asim min Tariq al-Tayyibah",
    slug: "hafs-an-asim-min-tariq-al-tayyibah",
  },
  {
    arabicName: "هشام عن ابن عامر",
    englishName: "Hisham an Ibn Amir",
    slug: "hisham-an-ibn-amir",
  },
  {
    arabicName: "ابن ذكوان عن ابن عامر",
    englishName: "Ibn Dhakwan an Ibn Amir",
    slug: "ibn-dhakwan-an-ibn-amir",
  },
  {
    arabicName: "ابن جماز عن أبي جعفر",
    englishName: "Ibn Jamaz an Abu Jaafar",
    slug: "ibn-jamaz-an-abu-jaafar",
  },
  {
    arabicName: "ابن وردان عن أبي جعفر",
    englishName: "Ibn Wardan an Abu Jafar",
    slug: "ibn-wardan-an-abu-jafar",
  },
  {
    arabicName: "ابن وردان وابن جماز من طريق الدرة",
    englishName: "Ibn Wardan wa Ibn Jammaz min Tariq al-Durrah",
    slug: "ibn-wardan-wa-ibn-jammaz-min-tariq-al-durrah",
  },
  {
    arabicName: "ورش عن نافع من طريق الأزرق",
    englishName: "warsh an Nafi min Traiq al-Azraq",
    slug: "warsh-an-nafi-min-traiq-al-azraq",
  },
  {
    arabicName: "خلاد عن حمزة",
    englishName: "Khalaad an Hamzah",
    slug: "khalaad-an-hamzah",
  },
  {
    arabicName: "خلف عن حمزة",
    englishName: "Khalaf an Hamzah",
    slug: "khalaf-an-hamzah",
  },
  {
    arabicName: "قالون عن نافع",
    englishName: "Qalun an Nafi",
    slug: "qalun-an-nafi",
  },
  {
    arabicName: "قنبل عن ابن كثير",
    englishName: "Qunbul an Ibn Kathir",
    slug: "qunbul-an-ibn-kathir",
  },
  {
    arabicName: "روح عن يعقوب الحضرمي",
    englishName: "Ruuh an Yaqub al-Hadrami",
    slug: "ruuh-an-yaqub-al-hadrami",
  },
  {
    arabicName: "رويس عن يعقوب الحضرمي",
    englishName: "Ruways an Yaqub al-Hadrami",
    slug: "ruways-an-yaqub-al-hadrami",
  },
  {
    arabicName: "شعبة عن عاصم",
    englishName: "Shubah an Asim",
    slug: "shubah-an-asim",
  },
  {
    arabicName: "ورش عن نافع",
    englishName: "Warsh an Nafi",
    slug: "warsh-an-nafi",
  },
  {
    arabicName: "ورش عن نافع من طريق الاصبهاني",
    englishName: "Warsh an Nafi min Tariq al-Asbahani",
    slug: "warsh-an-nafi-min-tariq-al-asbahani",
  },
];

// Remove or comment out this line if you want to use the full list
export const RECITATIONS = [...RECITATIONS_LIST].splice(2);

export default RECITATIONS_LIST;
