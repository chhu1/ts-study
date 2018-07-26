declare module 'url' {
    interface Url {
        url: string;
    }

    export function parseUrl(url: string): Url;
}
