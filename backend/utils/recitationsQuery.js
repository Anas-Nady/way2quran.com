const Recitations = require("../models/recitationModel");
const {
  hafsAnAsim,
  completedRecitations,
  variousRecitations,
} = require("./../constants/recitationsTxt");

exports.recitationsFilter = async (recitationSlug) => {
  if (!recitationSlug) {
    return {};
  }

  if (recitationSlug === completedRecitations) {
    const recitation = await Recitations.findOne({ slug: hafsAnAsim });
    return {
      recitations: {
        $elemMatch: {
          recitationInfo: recitation._id,
          audioFiles: { $size: 114 },
        },
      },
    };
  }

  if (recitationSlug === variousRecitations) {
    const recitation = await Recitations.findOne({ slug: hafsAnAsim });
    return {
      recitations: {
        $elemMatch: {
          recitationInfo: recitation._id,
          audioFiles: { $not: { $size: 114 } },
        },
      },
    };
  }

  const recitation = await Recitations.findOne({ slug: recitationSlug });
  if (!recitation) {
    return {};
  }

  return {
    recitations: {
      $elemMatch: { recitationInfo: recitation._id },
    },
  };
};

exports.searchQuery = function (search) {
  if (!search) return {};

  const trimmedSearch = search.replace(/\s+/g, " ").trim();

  return {
    $or: [
      {
        englishName: new RegExp(trimmedSearch, "i"),
      },
      {
        arabicName: new RegExp(trimmedSearch.replace(/ا/g, "[اأإآ]"), "i"),
      },
    ],
  };
};

exports.sortQuery = function (sort) {
  const sortBy = {};

  if (!sort) {
    return sortBy;
  }

  const allowedSortFields = [
    "arabicName",
    "totalViewers",
    "number",
    "totalRecitations",
  ];

  const sortFields = sort
    .toString()
    .split(",")
    .map((field) => field.trim());

  const removeLeadingDash = (field) => field.replace(/^-/, "");
  sortFields.forEach((field) => {
    if (allowedSortFields.includes(removeLeadingDash(field))) {
      if (field.startsWith("-")) {
        sortBy[removeLeadingDash(field)] = -1;
      } else {
        sortBy[field] = 1;
      }
    }
  });
  return sortBy;
};
