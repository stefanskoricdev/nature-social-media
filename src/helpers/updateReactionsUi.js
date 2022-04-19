export const updateReactionsUi = (args) => {
  const {
    event,
    updatedItem,
    didUserLike,
    didUserDislike,
    handleNeutralizeLike,
    handleNeutralizeDislike,
    targetedPostIndex,
    setPosts,
  } = args;
  setPosts((prevState) => {
    if (event.target.id === "upvote") {
      if (didUserLike) {
        handleNeutralizeLike();
      }
    } else {
      if (didUserDislike) {
        handleNeutralizeDislike();
      }
    }
    prevState[targetedPostIndex] = updatedItem;
    return [...prevState];
  });
};
