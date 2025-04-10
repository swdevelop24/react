export const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 6,
  },
  largeDesktop: {
    breakpoint: { max: 3000, min: 1280},
    items: 5,
  },
  mediumDesktop: {
    breakpoint: { max: 1280, min: 1024 }, // NEW! 가로 좁아짐
    items: 3, //  여기서 줄임
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
  },
  smallTablet: {
    breakpoint: { max: 768, min: 464 }, // ✅ 여기 추가
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 }, // ✅ 그대로 유지
    items: 1,
  },
};
