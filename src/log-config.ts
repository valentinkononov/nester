import * as winston from 'winston';
import * as appRoot from 'app-root-path';
import config from './config';

export default {
  winstonOptions: {
    transports: [
      new winston.transports.File({
        level: config.log.file.level,
        dirname: `${appRoot}/${config.log.file.dirName}`,
        filename: config.log.file.fileName,
        handleExceptions: true,
        maxsize: config.log.file.maxSize,
        maxFiles: config.log.file.maxFiles,
      }),
      new winston.transports.Console({
        level: config.log.console.level,
        handleExceptions: true,
      }),
    ],
    exitOnError: false,
  },
};
