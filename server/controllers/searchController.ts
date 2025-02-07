import { searchQuery } from "../utils/recitationsQuery";
import Reciters from "./../models/reciterModel";
import Recitations from "./../models/recitationModel";
import Surah from "./../models/surahModel";
import asyncHandler from "express-async-handler";

export const globalSearch = asyncHandler(async (req, res, next) => {
  const searchText = req.query.q || "";

  if (!searchText) {
    res.status(400).json({ message: "Search text is required" });
  }

  const searchQueries = searchQuery(searchText as string);
  const aggregationPipeline = [
    {
      $match: searchQueries,
    },
    {
      $project: {
        _id: 0,
        number: 1,
        arabicName: 1,
        englishName: 1,
        slug: 1,
        pageNumber: 1,
      },
    },
    {
      $limit: 6,
    },
  ];

  const [reciters, recitations, surahs] = await Promise.all([
    Reciters.aggregate(aggregationPipeline),
    Recitations.aggregate(aggregationPipeline),
    Surah.aggregate(aggregationPipeline),
  ]);

  const results = {
    reciters,
    recitations,
    surahs,
  };
  res.status(200).json(results);
});
