import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';

class UsersService {
  async create(email: string) {
    const usersRepository = getCustomRepository(UsersRepository);

    //Verificando se o usuário existe
    const userExists = await usersRepository.findOne({
      email,
    });

    // Se existir, retorna o user
    if (userExists) {
      return userExists;
    }

    // Se não existir Salva o user no banco e retorna o user
    const user = usersRepository.create({
      email,
    });

    await usersRepository.save(user);

    return user;
  }
}

export { UsersService };
