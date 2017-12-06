// write a function that will retrieve a chunk of data
// make a ajax request with the fetch function

const URL = 'http://rallycoding.herokuapp.com/api/music_albums'

// grabs the json data from the URL
function fetchAlbums(){
  fetch(URL)
  // fetch returns a promise to the .then function
  .then(res => res.json())
  // to get use of the promise passed down through the previous .then, a new .then is used
  .then(json => console.log(json))
  // this function however is not asychronus
}


// version 2
// refractored version that allows for the function to run asychronus
async function fetchAlbumsV2(){
  // assigning a variable to the request
  const res = await fetch(URL)
  // pulls the json from the previous function
  const json = await res.json()
  console.log(json);
}

// version 3
const fetchAlbumsV3 = async() => {
  const res = await fetch(URL)
  const json = await res.json()
  console.log(json);
}

fetchAlbums()
fetchAlbumsV2()
fetchAlbumsV3()
