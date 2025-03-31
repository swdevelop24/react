const useUserStore = create((set) => ({
    // user를 배열로 초기화
    user: [],
  
    // setUser: 새로운 유저 추가
    setUser: (id) =>
      set((state) => ({
        user: [...state.user, { id }], // 배열에 새로운 유저 추가
      })),
  }));
  
  export default useUserStore;
  