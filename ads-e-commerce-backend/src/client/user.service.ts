import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClientDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateClientDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private clientRepository: Repository<User>,
  ) { }

  async create(createClientDto: CreateClientDto): Promise<User> {
    const existingClient = await this.clientRepository.findOne({
      where: { email: createClientDto.email },
    });

    if (existingClient) {
      throw new ConflictException(
        `E-mail ${createClientDto.email} já cadastrado.`,
      );
    }

    // Cria hash de senha
    createClientDto.password = await bcrypt.hash(createClientDto.password, 10);

    const newClient = this.clientRepository.create(createClientDto);
    return this.clientRepository.save(newClient);
  }

  async findAll(): Promise<User[]> {
    return this.clientRepository.find({
      relations: ['addresses'],
    });
  }

  async findOne(id: number): Promise<User> {
    const client = await this.clientRepository.findOne({
      where: { id },
      relations: ['addresses'],
    });

    if (!client) {
      throw new NotFoundException(`Client com #${id} não encontrado`);
    }

    return client;
  }

  async update(id: number, updateClientDto: UpdateClientDto): Promise<User> {
    const client = await this.findOne(id);

    if (updateClientDto.password) {
      updateClientDto.password = await bcrypt.hash(
        updateClientDto.password,
        10,
      );
    }

    Object.assign(client, updateClientDto);
    return this.clientRepository.save(client);
  }

  async remove(id: number): Promise<void> {
    const result = await this.clientRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Client com #${id} não encontrado`);
    }
  }
}
