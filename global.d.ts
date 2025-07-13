// global.d.ts
declare module 'next-with-less';
// global.d.ts
declare module '*.less' {
  const classes: { [key: string]: string };
  export default classes;
}