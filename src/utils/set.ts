export const union = <T>(a: T[], b: T[]) =>
  b.reduce((set, item) => set.add(item), new Set(a));

export const intersection = <T>(a: T[], b: T[]) => {
  const s = new Set(b);
  return a.filter((x) => s.has(x));
};

export const difference = <T>(a: T[], b: T[]) => {
  const s = new Set(b);
  return a.filter((x) => !s.has(x));
};
