import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auction, AuctionStatus } from '../entities/auction.entity';
import { Item } from '../entities/item.entity';
import { CreateAuctionDto } from './dtos/create-auction.dto.js';
import { UpdateAuctionDto } from './dtos/update-auction.dto.js';

@Injectable()
export class AuctionsService {
  constructor(
    @InjectRepository(Auction) private readonly auctionRepo: Repository<Auction>,
    @InjectRepository(Item) private readonly itemRepo: Repository<Item>,
  ) {}

  async create(dto: CreateAuctionDto) {
    const item = await this.itemRepo.findOne({ where: { id: dto.itemId } });
    if (!item) throw new BadRequestException('Invalid itemId');
    const entity = this.auctionRepo.create({
      itemId: dto.itemId,
      currency: dto.currency ?? 'VND',
      startPriceCents: String(dto.startPriceCents),
      currentPriceCents: String(dto.startPriceCents),
      minIncrementCents: String(dto.minIncrementCents),
      reservePriceCents: dto.reservePriceCents != null ? String(dto.reservePriceCents) : null,
      buyNowPriceCents: dto.buyNowPriceCents != null ? String(dto.buyNowPriceCents) : null,
      startsAt: new Date(dto.startsAt),
      endsAt: new Date(dto.endsAt),
      status: (dto.status ?? 'PENDING') as AuctionStatus,
      autoExtendSeconds: dto.autoExtendSeconds ?? 0,
      maxExtensions: dto.maxExtensions ?? 0,
      extensionsUsed: 0,
    });
    return this.auctionRepo.save(entity);
  }

  findAll() {
    return this.auctionRepo.find({ order: { endsAt: 'ASC' } });
  }

  async findOne(id: string) {
    const found = await this.auctionRepo.findOne({ where: { id } });
    if (!found) throw new NotFoundException('Auction not found');
    return found;
  }

  async update(id: string, dto: UpdateAuctionDto) {
    const found = await this.findOne(id);
    Object.assign(found, normalizeMonetaryFields(dto));
    return this.auctionRepo.save(found);
  }

  async remove(id: string) {
    const found = await this.findOne(id);
    await this.auctionRepo.remove(found);
    return { id };
  }
}

function normalizeMonetaryFields(dto: UpdateAuctionDto): Partial<Auction> {
  const map: Partial<Auction> = { ...dto } as unknown as Partial<Auction>;
  const monetary = ['startPriceCents', 'minIncrementCents', 'reservePriceCents', 'buyNowPriceCents'] as const;
  for (const key of monetary) {
    const value = (dto as any)[key];
    if (value != null) (map as any)[key] = String(value);
  }
  return map;
}


