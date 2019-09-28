import * as SygicService from './sygic'

async function computeTrips({
  originId,
  travelDate,
  maxPrice,
  withHalfFare,
  categories,
}) {
  const matchingPlaces = await SygicService.getMatchingPlaces({
    categories: categories.join('|'),
  })
  return matchingPlaces
    .filter(place => place.isReachable)
    .slice(0, 10)
    .map(place => ({
      start: 1546325700,
      end: 1546371900,
      price: 10,
      discount: 65,
      categories: place.categories,
    }))
}

export { computeTrips }