const {
  hafsAnAsim,
  completedRecitations,
  variousRecitations,
} = require("./../constants/recitationsTxt");

const buildRecitationFilter = (recitationType) => {
  if (!recitationType) {
    return {};
  }

  if (recitationType === completedRecitations) {
    return {
      recitations: {
        $elemMatch: {
          slug: hafsAnAsim,
          audioFiles: { $size: 114 },
        },
      },
    };
  }

  if (recitationType === variousRecitations) {
    return {
      recitations: {
        $elemMatch: {
          slug: hafsAnAsim,
          audioFiles: { $not: { $size: 114 } },
        },
      },
    };
  }

  return {
    recitations: {
      $elemMatch: { slug: recitationType },
    },
  };
};

module.exports = buildRecitationFilter;
