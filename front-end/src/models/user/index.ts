/* tslint:disable:variable-name */
export class User {
    readonly id: number;
    readonly username: string;
    readonly name: string;
    readonly auth_token: string;
    constructor(userApiReturn: {id: number, username: string, name: string, auth_token: string}) {
        this.id = userApiReturn.id;
        this.username = userApiReturn.username;
        this.name = userApiReturn.name;
        this.auth_token = userApiReturn.auth_token;
    }
}