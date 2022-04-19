export const getUserActivity = (posts, username) => {
  const userPublications = posts.filter(
    (post) => post.userHandle === username
  ).length;

  const allUpvotes = posts.map((post) => post.upVotes).flat(Infinity);
  const alldownvotes = posts.map((post) => post.downVotes).flat(Infinity);
  const mergedVotes = allUpvotes.concat(alldownvotes);
  const userReactions = mergedVotes.filter(
    (voteAuthor) => voteAuthor === username
  ).length;

  const allComments = posts.map((post) => post.comments).flat(Infinity);
  const userComments = allComments.filter(
    (comment) => comment.author === username
  ).length;

  return {
    userPublications,
    userReactions,
    userComments,
  };
};
