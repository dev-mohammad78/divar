const defaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 60 * 1000, // 1 minute
  },
};

export default defaultOptions;
