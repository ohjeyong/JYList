import { APIUser } from './APIReturn';
export { APIUser };

export class User {
    readonly id: number;
    readonly username: string;
    readonly name: string;
    readonly authToken: string;
    constructor(apiReturn: APIUser) {
        this.id = apiReturn.id;
        this.username = apiReturn.username;
        this.name = apiReturn.name;
        this.authToken = apiReturn.auth_token;
    }
}
