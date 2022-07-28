declare module 'markdown' {
    export function parse(md: string): string
}
declare module "bloglist.json" {
  const value: Record<string, string>;
  export default value;
}
