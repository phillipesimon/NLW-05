import { getCustomRepository, Repository } from 'typeorm';
import { User } from '../entities/User';
import { UsersRepository } from '../repositories/UsersRepository';

class UsersService {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  async create(email: string) {
    //Verificando se o usuário existe
    const userExists = await this.usersRepository.findOne({
      email,
    });

    // Se existir, retorna o user
    if (userExists) {
      return userExists;
    }

    // Se não existir Salva o user no banco e retorna o user
    const user = this.usersRepository.create({
      email,
    });

    await this.usersRepository.save(user);

    return user;
  }
}

export { UsersService };
