export default function range(end: number): number[];

export default function range(start: number, end: number): number[];

export default function range(startOrEnd: number, maybeEnd?: number): number[] {
  const { start, end } =
    maybeEnd !== undefined
      ? { start: startOrEnd, end: maybeEnd }
      : { start: 0, end: startOrEnd };

  return Array(end - start)
    .fill(0)
    .map((_, index) => start + index);
}
