export function matchesMarketSearch(event, query) {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
  if (words.length === 0) return true

  const searchText = [
    event.title,
    event.category,
    ...event.outcomes.map(outcome => outcome.label)
  ].join(' ').toLowerCase()

  return words.every(word => searchText.includes(word))
}
