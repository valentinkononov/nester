import * as dotenv from 'dotenv';

dotenv.config({
    path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env',
});

export default {
    api: {
        port: process.env.PORT,
        root: process.env.ROOT,
        version: '0.1',
    },

    auth: {
        jwt: {
            secret: process.env.JWT_SECRET,
            ttl: process.env.TTL || '1d',
        },
    },

    log: {
        console: {
            level: process.env.LOGGER_LEVEL || 'debug',
        },
        file: {
            dirName: process.env.LOGGER_DIR || 'logs',
            fileName: process.env.LOGGER_FILE || 'api.log',
            level: process.env.LOGGER_LEVEL || 'debug',
            maxSize: process.env.LOGGER_MAX_SIZE
                ? parseInt(process.env.LOGGER_MAX_SIZE, 10)
                : 1024 * 1024 * 10, // 10MB
            maxFiles: process.env.LOGGER_MAX_FILES
                ? parseInt(process.env.LOGGER_MAX_FILES, 10)
                : 5,
        },
    },
};
