const prometheus_url = 'https://prometheus.datasektionen.se/api'

const getJson = path => fetch(prometheus_url + path).then(res => res.json())

const getEvents   = () => getJson('/list/event')
const getStickies = () => getJson('/sticky')
const getList     = type => getJson('/list/' + type)
const getItem     = item => getJson('/item/' + item)


export default getList

export {
  getEvents,
  getStickies,
  getList,
  getItem
}
