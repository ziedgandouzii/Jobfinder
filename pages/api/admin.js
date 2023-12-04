import { router as adminJsRouter, path as adminJsPath } from '../../Services/admin-config';

export default (req, res) => {
    return adminJsRouter(req, res);
};

export const config = {
    api: {
        bodyParser: false,
    },
};
