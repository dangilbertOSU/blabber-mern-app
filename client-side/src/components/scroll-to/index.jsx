export const scrollToRef = (ref) => {
  ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
};
