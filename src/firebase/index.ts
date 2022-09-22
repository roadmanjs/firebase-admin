import * as admin from 'firebase-admin';

import {app} from 'firebase-admin';
import config from '../config';

export interface FirebaseConfig {
    appOptions: any; // serviceAccount json
    name?: string;
}

export interface FirebaseProject extends app.App {
    projectId: string;
}

export const configureFirebase = async (fbconfig?: FirebaseConfig): Promise<FirebaseProject> => {
    if (fbconfig) {
        const initAndReturn = async () => {
            const app = await admin.initializeApp(
                {
                    credential: admin.credential.cert(fbconfig.appOptions),
                    databaseURL: `https://${fbconfig.appOptions.project_id}.firebaseio.com`,
                },
                fbconfig.name
            );

            // initialize app
            return {...app, projectId: fbconfig.name};
        };

        // check if app is already initialized, return it
        if (admin.apps.length) {
            const app = admin.apps.find((app) => app.name === fbconfig.name);
            if (app) {
                return {...app, projectId: app.name};
            }
            return initAndReturn();
        }
        return initAndReturn();
    }

    let defaultApp: app.App;

    // default
    if (!admin.apps.length) {
        defaultApp = await admin.initializeApp({
            credential: admin.credential.cert(config as any),
            databaseURL: `https://${config.project_id}.firebaseio.com`,
        });

        const {project_id} = config;
        const projectId = project_id;
        return {projectId, ...defaultApp};
    }

    defaultApp = admin.apps[0];
    const projectId = config.project_id;
    return {projectId, ...defaultApp};
};
