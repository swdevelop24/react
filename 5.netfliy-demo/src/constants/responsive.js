export const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
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
