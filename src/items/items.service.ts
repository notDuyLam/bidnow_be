import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../entities/item.entity';
import { CreateItemDto } from './dtos/create-item.dto.js';
import { UpdateItemDto } from './dtos/update-item.dto.js';

@Injectable()
export class ItemsService {
  constructor(@InjectRepository(Item) private readonly repo: Repository<Item>) {}

  create(dto: CreateItemDto) {
    const entity = this.repo.create({
      sellerId: dto.sellerId,
      title: dto.title,
      description: dto.description ?? null,
      images: dto.images ?? [],
      categoryId: dto.categoryId ?? null,
    });
    return this.repo.save(entity);
  }

  async findAll() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string) {
    const found = await this.repo.findOne({ where: { id } });
    if (!found) throw new NotFoundException('Item not found');
    return found;
  }

  async update(id: string, dto: UpdateItemDto) {
    const found = await this.findOne(id);
    Object.assign(found, dto);
    return this.repo.save(found);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.repo.remove(found);
    return { id };
  }
}


