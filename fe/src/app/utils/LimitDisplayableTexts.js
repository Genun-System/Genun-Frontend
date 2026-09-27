export const LimitDisplayableTexts = (texts,maxLenOfTextDisplayable) =>{
    if (!texts) {
        return ""
    }
    if (texts?.length<=maxLenOfTextDisplayable) {
        return texts;
    }

    return `${texts?.slice(0,maxLenOfTextDisplayable)}...`;
}