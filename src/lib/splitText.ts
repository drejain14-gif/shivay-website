/** Lightweight SplitText stand-in (Club SplitText is not available). */

export function splitIntoWords(text: string): string[] {
  return text.trim().split(/\s+/).filter(Boolean);
}

export function wrapWordsAsSpans(
  text: string,
  wordClass = "split-word",
): string {
  return splitIntoWords(text)
    .map(
      (word) =>
        `<span class="${wordClass}" style="display:inline-block;white-space:nowrap">${word}&nbsp;</span>`,
    )
    .join("");
}
