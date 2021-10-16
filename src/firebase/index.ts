import * as admin from 'firebase-admin';

import config from '../config';

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(config as any),
        databaseURL: `https://${config.project_id}.firebaseio.com`,
    });
}

const {project_id} = config;
const auth = admin.auth;
const projectId = project_id;
export {auth, projectId};
