import { UserDto } from "../user/user-dto";

export class AuthResponseDto {
    user: UserDto;
    token: string; // Добавляем свойство token

    static parseJson(json: any): AuthResponseDto {
        if (json === null || json === undefined) {
            return null;
        }

        let authResponse = new AuthResponseDto();
        authResponse.user = json.user;
        authResponse.token = json.token; // Добавляем присваивание токена

        return authResponse;
    }
}