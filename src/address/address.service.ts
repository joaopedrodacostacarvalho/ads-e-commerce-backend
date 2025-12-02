import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Not, Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { ClientService } from 'src/client/client.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
    private clientService: ClientService,
  ) {}

  private async ensureSingleDefault(
    clientId: number,
    addressIdToExclude?: number,
  ): Promise<void> {
    await this.addressRepository.update(
      {
        clientId,
        isDefault: true,
        // Excluirá os endereços que estamos atualmente configurando/criando
        ...(addressIdToExclude ? { id: Not(addressIdToExclude) } : {}),
      },
      { isDefault: false },
    );
  }

  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    await this.clientService.findOne(createAddressDto.clientId);

    if (createAddressDto.isDefault) {
      await this.ensureSingleDefault(createAddressDto.clientId);
    }

    const newAddress = this.addressRepository.create(createAddressDto);
    return this.addressRepository.save(newAddress);
  }

  async findAllByClient(clientId: number): Promise<Address[]> {
    await this.clientService.findOne(clientId);

    return this.addressRepository.findBy({ clientId: clientId });
  }

  async findOne(id: number): Promise<Address> {
    const address = await this.addressRepository.findOne({ where: { id } });

    if (!address) {
      throw new NotFoundException(`Endereço com o #${id} não encontrado`);
    }

    return address;
  }

  async update(
    id: number,
    updateAddressDto: UpdateAddressDto,
  ): Promise<Address> {
    const address = await this.findOne(id);

    if (updateAddressDto.isDefault === true) {
      await this.ensureSingleDefault(address.clientId, id);
    }

    Object.assign(address, updateAddressDto);
    return this.addressRepository.save(address);
  }

  async remove(id: number): Promise<void> {
    const result = await this.addressRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Endereço com o #${id} não encontrado`);
    }
  }
}
