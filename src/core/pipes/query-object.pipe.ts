import { Injectable, PipeTransform, Logger } from '@nestjs/common';

export interface QueryObjectPipeOptions<V> {
    isArray?: boolean;
    defaultValue?: V;
}

@Injectable()
export class QueryObjectPipe<V> implements PipeTransform<string> {
    constructor(private options: QueryObjectPipeOptions<V> = {}) {}

    transform(value: string): unknown {
        try {
            if (value) {
                return JSON.parse(value);
            } else if (this.options.defaultValue !== undefined) {
                return this.options.defaultValue;
            } else {
                return this.options.isArray ? [] : {};
            }
        } catch (err) {
            Logger.error(err.message);
            return this.options.isArray ? [] : {};
        }
    }
}
