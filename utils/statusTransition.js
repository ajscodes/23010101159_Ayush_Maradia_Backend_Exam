const transitions = {
  OPEN: ["IN_PROGRESS"],
  IN_PROGRESS: ["RESOLVED"],
  RESOLVED: ["CLOSED"],
  CLOSED: [],
};

export const isValidTransition = (currentStatus, newStatus) => {
  return transitions[currentStatus]?.includes(newStatus);
};
