export const formatFilmDuration = (duration) => {
  const hours = Math.floor(duration / 60)
  const minutes = duration % 60

  return `${hours}h ${minutes}m`
}
