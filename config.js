const prefixRemote =
  'https://carbonplan.blob.core.windows.net/carbonplan-data/tiles/processed'
const prefixLocal = 
  'http://localhost:8080'
// const prefix = 'http://localhost:8080'

export default {
  basemap: `${prefixRemote}/basemap`,
  emissions: `${prefixLocal}/emissions`,
}
