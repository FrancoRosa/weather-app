import Unsplash, { toJson } from 'unsplash-js';

const unsplash = new Unsplash({
  accessKey: `${process.env.UNSPLASH_ACCESS}`,
  secretKey: `${process.env.UNSPLASH_SECRET}`,
});

async function setBackground() {
  const city = document.querySelector('.city-name').value;

  const json = await unsplash.search.photos(city, 1, 5, { orientation: 'landscape' }).then(toJson);
  document.body.style['background-image'] = ` linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(117, 19, 93, 0.73)),
  url("${json.results[0].urls.small}")`;
}

export default setBackground;