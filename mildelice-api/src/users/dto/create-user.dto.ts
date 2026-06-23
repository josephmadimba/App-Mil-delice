export class CreateUserDto {
  name!: string;
  email!: string;
  password!: string;
  role!: any; // On met 'any' temporairement pour accepter le rôle envoyé par Thunder Client
}