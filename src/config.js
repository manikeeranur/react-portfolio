// Development: empty string → CRA proxy forwards /api/* to localhost:5000
// Production:  REACT_APP_API_URL → https://node-portfolio-8jhq.onrender.com
const API_BASE = process.env.REACT_APP_API_URL || '';

export default API_BASE;
