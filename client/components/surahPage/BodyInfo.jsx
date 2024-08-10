import { ayatQuranFont } from "@/fonts/font";
import { bismillahArabicSVG } from "../Icons";

function BodyInfo({ locale, surahText }) {
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="flex items-center justify-center pt-5">
        {bismillahArabicSVG}
      </div>
      {surahText.map((aya) => (
        <div
          className="flex px-4 gap-2 pb-5 my-10 border-b-2 dark:border-gray-700 items-center text-[25px] sm:text-3xl xl:text-4xl 2xl:text-[40px] text-gray-800 dark:text-slate-200"
          key={aya.id}
        >
          <div className="w-full">
            <div dir="rtl">
              <span className="mb-1 leading-normal aya-arabic font-arabic">
                {aya.textArabic}
                <span
                  className={`${ayatQuranFont.className} text-[40px] sm:text-5xl 2xl:text-6xl`}
                >
                  {aya.id}
                </span>
              </span>
            </div>
            {locale === "en" && (
              <div dir="ltr">
                <span className="mb-1 leading-normal aya-arabic font-english">
                  {aya.textEnglish}
                  <span
                    className={`${ayatQuranFont.className} text-[40px] sm:text-5xl 2xl:text-6xl`}
                  >
                    {aya.id}
                  </span>
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default BodyInfo;
