import DOMPurify from "dompurify"

/** El texto del organizador viene como HTML: se limpia antes de mostrarlo. */
export const cleanHtml = (html: string) => DOMPurify.sanitize(html)
