import Recitations, { IRecitation } from "../models/recitationModel";
import {
  hafsAnAsim,
  completedRecitations,
  variousRecitations,
} from "./../constants/recitationsTxt";

export const recitationsFilter = async (recitationSlug: string) => {
  if (!recitationSlug) {
    return {};
  }

  if (recitationSlug === completedRecitations) {
    const recitation = (await Recitations.findOne({
      slug: hafsAnAsim,
    })) as IRecitation;
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
    const recitation = (await Recitations.findOne({
      slug: hafsAnAsim,
    })) as IRecitation;
    return {
      recitations: {
        $elemMatch: {
          recitationInfo: recitation._id,
          audioFiles: { $not: { $size: 114 } },
        },
      },
    };
  }

  const recitation: IRecitation | null = await Recitations.findOne({
    slug: recitationSlug,
  });
  if (!recitation) {
    return {};
  }

  return {
    recitations: {
      $elemMatch: { recitationInfo: recitation._id },
    },
  };
};

export const searchQuery = function (search: string) {
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

export const sortQuery = function (sort: string): { [key: string]: 1 | -1 } {
  const sortBy: { [key: string]: 1 | -1 } = {};

  if (!sort) {
    return sortBy;
  }

  const allowedSortFields = [
    "arabicName",
    "totalViewers",
    "number",
    "totalRecitations",
  ] as const;

  type AllowedSortField = (typeof allowedSortFields)[number];

  const sortFields = sort
    .toString()
    .split(",")
    .map((field) => field.trim());

  const removeLeadingDash = (field: string): string => field.replace(/^-/, "");

  sortFields.forEach((field) => {
    const fieldName = removeLeadingDash(field) as AllowedSortField;

    if (allowedSortFields.includes(fieldName)) {
      if (field.startsWith("-")) {
        sortBy[fieldName] = -1;
      } else {
        sortBy[fieldName] = 1;
      }
    }
  });

  return sortBy;
};
