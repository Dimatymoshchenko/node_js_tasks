const http = require('http');

const paramsRegexp = /:[^/]+/g;
const getRouteRegexp = route => new RegExp(`^${route}$`.replace(paramsRegexp, '([^/]+)'));
const bodyParse = (request) => {
  let bodyData = Buffer.from([]);
  return new Promise((resolve, reject) => {
    request.on('data', (data) => bodyData = Buffer.concat([bodyData, data]));
    request.on('end', () => resolve(JSON.parse(bodyData.toString())));
    request.on('error', reject);
  })
};
const routes = {
  GET: new Map([['/users/:id', (req, res) => {
    res.end('Success');
  }]]), POST: new Map([['/users', async (req, res) => {
    const bodyData = await bodyParse(req);
    res.end(JSON.stringify(bodyData));
  }]])
};

function getRouteParams(matchedRoute, path) {
  const paramNames = (matchedRoute.match(paramsRegexp) || []).map(item => item.substring(1));
  return paramNames.length ? path.match(getRouteRegexp(matchedRoute))
    .slice(1)
    .reduce((res, val, idx) => (Object.assign(res, { [paramNames[idx]]: val })), {}) : {};
}

http.createServer(async (req, res) => {
  const [path, queryParams] = req.url.split('?');
  const matchedRoutes = routes[req.method.toUpperCase()];
  const matchedRoute = [...routes[req.method.toUpperCase()].keys()]
    .find(route => getRouteRegexp(route).test(path))
  const routeParams = getRouteParams(matchedRoute, path);
  Object.assign(req, { queryParams, routeParams });
  matchedRoutes.get(matchedRoute)(req, res);
}).listen(3000, () => console.log(`Listening on port ${3000}...`));