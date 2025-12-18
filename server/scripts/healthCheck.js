const http = require('http');

const PORT = process.env.PORT || 5001;
const BASE_URL = `http://localhost:${PORT}`;

const routes = [
  { path: '/', method: 'GET', expectedStatus: 200 },
  { path: '/api/auth/test', method: 'GET', expectedStatus: 404 }, // Assuming this doesn't exist, just testing 404
  { path: '/api/goals', method: 'GET', expectedStatus: 401 }, // Protected
  { path: '/api/journals', method: 'GET', expectedStatus: 401 }, // Protected
  { path: '/api/meditations', method: 'GET', expectedStatus: 401 }, // Protected
  { path: '/api/moods', method: 'GET', expectedStatus: 401 }, // Protected
  { path: '/api/community', method: 'GET', expectedStatus: 401 }, // Protected\
];

console.log(`Starting Health Check on ${BASE_URL}...`);
console.log('Note: Ensure the server is running before executing this script.\n');

async function checkRoute(route) {
  return new Promise((resolve) => {
    const req = http.request(`${BASE_URL}${route.path}`, { method: route.method }, (res) => {
      const success = res.statusCode === route.expectedStatus ||
        (route.expectedStatus === 401 && res.statusCode === 403); // Allow 403 for protected

      const result = {
        path: route.path,
        method: route.method,
        status: res.statusCode,
        expected: route.expectedStatus,
        pass: success
      };

      resolve(result);
    });

    req.on('error', (e) => {
      resolve({
        path: route.path,
        method: route.method,
        status: 'ERROR',
        expected: route.expectedStatus,
        pass: false,
        error: e.message
      });
    });

    req.end();
  });
}

(async () => {
  let passed = 0;
  let failed = 0;

  for (const route of routes) {
    const result = await checkRoute(route);
    if (result.pass) {
      console.log(`✅ [PASS] ${result.method} ${result.path} - Got ${result.status}`);
      passed++;
    } else {
      console.log(`❌ [FAIL] ${result.method} ${result.path} - Expected ${result.expected}, Got ${result.status} ${result.error ? `(${result.error})` : ''}`);
      failed++;
    }
  }

  console.log(`\nResults: ${passed} Passed, ${failed} Failed`);
  if (failed > 0) process.exit(1);
})();
