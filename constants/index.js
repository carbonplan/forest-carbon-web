export const allOptions = {
  scenarios: ['SSP2-4.5', 'SSP3-7.0', 'SSP5-8.5'],
  years: Array(20)
    .fill(0)
    .map((_, i) => (i + 2001).toString()),
}

export const optionIndex = (label, value) => {
  return allOptions[label].indexOf(value)
}

export const optionKey = (options) => {
  const key = [
    optionIndex('scenarios', options.scenario),
    optionIndex('years', options.year),
  ].join('_')
  return key
}

export const colorRanges = {
  forests: [5000, 70000],
}
