export const loadArtistData = async (name) => {
  const artistsAlbums = await getArtist(name)
  if (artistsAlbums != null) {
    if (name[name.length - 1] === 's') {
      name.value = decodeURI(name) + `' albums`
    } else {
      name.value = decodeURI(name) + `'s albums`
    }

    albums.value = artistsAlbums
  } else {
    name.value = 'Artist not found'
    albums.value = []
  }
}
