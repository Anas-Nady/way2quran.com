const { searchQuery } = require("../utils/recitationsQuery");
const Reciters = require("./../models/reciterModel");
const Recitations = require("./../models/recitationModel");
const Surah = require("./../models/surahModel");
const asyncHandler = require("express-async-handler");

exports.globalSearch = asyncHandler(async (req, res, next) => {
  const searchText = req.query.q || "";

  if (!searchText) {
    return res.status(400).json({ message: "Search text is required" });
  }

  const searchQueries = searchQuery(searchText);
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
