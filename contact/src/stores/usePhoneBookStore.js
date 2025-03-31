import { create } from "zustand";

// Zustand 스토어 생성
const usePhoneBookStore = create((set) => ({
  phoneBook: [],

  // 연락처 추가
  addContact: (name, phoneNumber) =>
    set((state) => {
      const updatedPhoneBook = [
        ...state.phoneBook,
        { id: Date.now(), name, phoneNumber },
      ];
      return {
        phoneBook: updatedPhoneBook,
        filteredPhoneBook: updatedPhoneBook, // 전체 연락처로 초기화
      };
    }),

  // 연락처 삭제 (ID 기반)
  removeContact: (id) =>
    set((state) => {
      const updatedPhoneBook = state.phoneBook.filter(
        (item) => item.id !== id
      );
      return {
        phoneBook: updatedPhoneBook,
        filteredPhoneBook: updatedPhoneBook, // 삭제 후 연락처 업데이트
      };
    }),

  // 모든 연락처 삭제
  removeAllContacts: () =>
    set(() => ({
      phoneBook: [],
      filteredPhoneBook: [],
    })),

  // 이름 또는 전화번호로 연락처 검색
  searchContacts: (query) =>
    set((state) => ({
      filteredPhoneBook: query
        ? state.phoneBook.filter((item) =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.phoneNumber.includes(query)
          )
        : state.phoneBook,
    })),

  // 필터된 연락처 목록 초기값 설정 (빈 배열)
  filteredPhoneBook: [],
}));

export default usePhoneBookStore;
