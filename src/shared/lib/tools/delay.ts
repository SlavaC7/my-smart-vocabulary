export const delay = (ms: number) =>
  new Promise(resolve => setTimeout(resolve as () => void, ms))
