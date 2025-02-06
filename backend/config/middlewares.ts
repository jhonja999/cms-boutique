module.exports = [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'http://localhost:3000'], // Allow your frontend origin
          'img-src': ["'self'", 'data:', 'blob:', 'http://localhost:3000'], // Allow images from your frontend
          'script-src': ["'self'", "'unsafe-inline'", 'http://localhost:3000'], // Allow scripts from your frontend
          'style-src': ["'self'", "'unsafe-inline'", 'http://localhost:3000'], // Allow styles from your frontend
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      origin: ['http://localhost:3000'], // Allow requests from your frontend
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Allowed HTTP methods
      headers: ['Content-Type', 'Authorization', 'X-Frame-Options'], // Allowed headers
      credentials: true, // Allow cookies and credentials
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];

/* export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
 */