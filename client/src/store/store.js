import create from "zustand";

const useStore = create((set) => ({
  response: [],
  setResponse: (newResponse) =>
    set((state) => ({
      response: [...state.response, ...newResponse],
    })),
}));

export default useStore;
