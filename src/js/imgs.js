import Unsplash, { toJson } from 'unsplash-js';

const unsplash = new Unsplash({
  accessKey: `${process.env.UNSPLASH_ACCESS}`,
  secretKey: `${process.env.UNSPLASH_SECRET}`,
});

async function setBackground() {
  const city = document.querySelector('.city-name').value;

  const json = await unsplash.search.photos(city, 1, 5, { orientation: 'landscape' }).then(toJson);
  document.querySelector('.bg-container')
    .style['background-image'] = ` linear-gradient(to bottom, #f5f6fc85, #75135dba), url("${json.results[0].urls.small}")`;
}

export default setBackground;