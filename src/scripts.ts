export function firstParagraphStripped(html: string, fallback = 'John Osterman'): string {
    const firstGraf = html.match(/<p.*?>.*?<\/p>/);
    if (firstGraf) {
        const stripped = firstGraf[0].replace(/<\/?\w+.*?>/g,'')
        return stripped;
    }
    return fallback;
}