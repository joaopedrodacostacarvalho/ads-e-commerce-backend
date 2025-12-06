import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRequest } from './dto/user.request.dto';
import { User } from './entities/user.entity';
import { UpdateClientDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { UserResponse } from './dto/user.response.dto';
import { plainToInstance } from 'class-transformer';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private clientRepository: Repository<User>,
  ) { }

  async findOne(id: number): Promise<UserResponse> {
    const client = await this.clientRepository.findOne({
      where: { id },
      relations: ['address'],
    });

    if (!client) {
      throw new NotFoundException(`Client com #${id} não encontrado`);
    }

      const entityDto = plainToInstance(UserResponse, client, {
        excludeExtraneousValues: true, // só retorna @Expose()
     });

    return entityDto;
  }


  //Utiliei uma biblioteca para paginacao, ja permite filtros, teste:
  //http://localhost:3000/user?sortBy=name:ASC&sortBy=createdAt:DESC
  //http://localhost:3000/user?filter.role=vendedor
 
  async findAll(query: PaginateQuery): Promise<Paginated<any>>{
      const result = await paginate(query, this.clientRepository, {
      sortableColumns: ['id', 'name', 'registrationDate'],
      searchableColumns: ['name', 'email'],
      defaultLimit: 10,
      maxLimit: 50,
      relations: ['addresses'],
       filterableColumns: {
      role: true,
      }, 
      
    });

    const entityDto = plainToInstance(UserResponse, result.data, {
        excludeExtraneousValues: true, // só retorna @Expose()
     });

    return {
      ...result,
      data: entityDto,
    };
  }


  

  async update(id: number, updateClientDto: UpdateClientDto): Promise<UserResponse> {
    const client = await this.clientRepository.findOne( { where: { id }});


    if (updateClientDto.password) {
      updateClientDto.password = await bcrypt.hash(
        updateClientDto.password,
        10,
      );
    }

    if (client){
      Object.assign(client, updateClientDto);
      this.clientRepository.save(client);
      
    }

    const entity = plainToInstance(UserResponse, client, {
    excludeExtraneousValues: true, // só retorna @Expose()
  });

    return entity;
  }

  async remove(id: number): Promise<void> {
    const result = await this.clientRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Client com #${id} não encontrado`);
    }
  }


}
