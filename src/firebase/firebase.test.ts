import 'mocha';

import {configureFirebase} from './';
import {expect} from 'chai';

const FIREBASE_CUSTOM_CONFIG = process.env.FIREBASE_CUSTOM_CONFIG || '{}';
const getCustomProjectConfig = () => JSON.parse(FIREBASE_CUSTOM_CONFIG);
const customProjectId = getCustomProjectConfig().project_id;
const opts = {
    appOptions: getCustomProjectConfig(),
    name: customProjectId,
};

describe('Firebase', () => {
    it('should init firebase default project', async () => {
        const firebaseProject = await configureFirebase();
        const projectId = firebaseProject.projectId;
        console.log('projectId', projectId);
        expect(projectId).to.equal('stqnetwork-dev');
    });

    it('should init firebase custom project then default project', async () => {
        const firebaseProject = await configureFirebase(opts);
        const projectId = firebaseProject.projectId;
        console.log('projectId', projectId);
        expect(projectId).to.equal(customProjectId);

        const defaultProject = await configureFirebase();
        expect(defaultProject.projectId).to.equal('stqnetwork-dev');
    });

    it('should init firebase custom project', async () => {
        const firebaseProject = await configureFirebase(opts);
        const projectId = firebaseProject.projectId;
        console.log('projectId', projectId);
        expect(projectId).to.equal(customProjectId);
    });

    it('should init firebase custom project with default project', async () => {
        await configureFirebase(); // init default project.

        // init second project
        const firebaseProject = await configureFirebase(opts);
        const projectId = firebaseProject.projectId;
        console.log('projectId', projectId);
        expect(projectId).to.equal(customProjectId);
    });

    it('should return existing custom firebase project and use an api with it', async () => {
        await configureFirebase(); // init default project.

        // init second project
        const firebaseProject = await configureFirebase(opts);

        const storage = firebaseProject.storage();

        const files = await storage
            .bucket(`${customProjectId}.appspot.com`)
            .getFiles({directory: 'thumb'});

        console.log('files', files);

        expect(files).to.not.be.empty;
    });
});
