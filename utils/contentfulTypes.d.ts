export interface About {
    body: string
}
export interface BlogPost {
    title: string,
    subtitle: string,
    body: string,
    snippet: string,
    // TO DO:  figure out how to type other fields
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
}
export interface HomePage {
    overview: string,
    body: string
}