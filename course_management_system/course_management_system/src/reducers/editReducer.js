const editReducer = (userData, action) => {
  switch (action.type) {
    case "EDIT":
      return { user: { ...action.user } };
    default:
      return userData;
  }
};

export default editReducer;
