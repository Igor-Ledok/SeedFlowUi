export class UserDto {
  id: number;
  email: string;

  static parseJson(json: any): UserDto 
  {
    if (json === null || json === undefined) {
      return null;
    }

    let userDto = new UserDto();

    userDto.id = json.id;
    userDto.email = json.email;

    return userDto;
  }
}