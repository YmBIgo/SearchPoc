export const UUIDGeneratorNode2 = () =>
    '00000000-0000-4000-8000-000000000000'.replace(/[08]/g, (c: string) =>
      (Number(c) ^ (Math.floor(Math.random()*16) & (15 >> (Number(c) / 4)))).toString(16)
);