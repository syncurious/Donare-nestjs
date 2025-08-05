import { Injectable } from '@nestjs/common';

@Injectable()
export class ResponseService {
    formatResponse<T>(data: T, message = 'Success', status = true, statusCode?: number) {
        return {
            statusCode,
            status,
            message,
            data,
        };
    }
}