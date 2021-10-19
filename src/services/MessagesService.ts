import { getCustomRepository, Repository } from 'typeorm';
import { Message } from '../entities/Message';
import { MessagesRepository } from '../repositories/MessagesRepository';

interface IMessageCreate {
  admin_id?: string;
  text: string;
  user_id: string;
}

class MessagesService {
  private messagesRepository: Repository<Message>;

  constructor() {
    this.messagesRepository = getCustomRepository(MessagesRepository);
  }

  async create({ admin_id, text, user_id }: IMessageCreate) {
    const message = this.messagesRepository.create({
      admin_id,
      text,
      user_id,
    });

    await this.messagesRepository.save(message);
    return message;
  }

  // Retornando a lista de mensagens do usuário usando o find
  async listByUser(user_id: string) {
    const list = await this.messagesRepository.find({ user_id });

    return list;
  }

  // Retornando a lista de mensagens do usuário e os dados dele usando o find
  // async listByUser(user_id: string) {
  // const messagesRepository = getCustomRepository(MessagesRepository);

  // Para retornar todos os dados do usuário usamos o relations com o nome dado na entities de messages
  // @JoinColumn({ name: 'user_id' })
  // @ManyToOne(() => User)
  // user: User;
  // const list = await messagesRepository.find({
  //   where: { user_id },
  //   relations: ['user'],
  // });

  //   return list;
  // }
}

export { MessagesService };
