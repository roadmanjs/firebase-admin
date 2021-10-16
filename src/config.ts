const firebaseServiceAccount = process.env.FIREBASE_SA || '{}';
const config = JSON.parse(firebaseServiceAccount);
export default config;
