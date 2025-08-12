import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bid } from '../entities/bid.entity';
import { Auction } from '../entities/auction.entity';
import { CreateBidDto } from './dtos/create-bid.dto';

@Injectable()
export class BidsService {
  constructor(
    @InjectRepository(Bid) private readonly bidRepo: Repository<Bid>,
    @InjectRepository(Auction) private readonly auctionRepo: Repository<Auction>,
  ) {}

  async place(dto: CreateBidDto) {
    const auction = await this.auctionRepo.findOne({ where: { id: dto.auctionId } });
    if (!auction) throw new BadRequestException('Invalid auctionId');
    const now = new Date();
    if (auction.status !== 'LIVE') throw new BadRequestException('Auction not live');
    if (auction.endsAt <= now) throw new BadRequestException('Auction ended');

    const minRequired = BigInt(auction.currentPriceCents) + BigInt(dto.minIncrementCents ?? 0n);
    const amount = BigInt(dto.amountCents);
    if (amount < minRequired) throw new BadRequestException('Bid too low');

    const entity = this.bidRepo.create({
      auctionId: dto.auctionId,
      userId: dto.userId,
      amountCents: String(dto.amountCents),
      isProxy: dto.isProxy ?? false,
    });
    const saved = await this.bidRepo.save(entity);

    // Update current price
    auction.currentPriceCents = String(amount);
    await this.auctionRepo.save(auction);

    return saved;
  }

  async listByAuction(auctionId: string) {
    return this.bidRepo.find({ where: { auctionId }, order: { createdAt: 'DESC' } });
  }

  async getById(id: string) {
    const found = await this.bidRepo.findOne({ where: { id } });
    if (!found) throw new NotFoundException('Bid not found');
    return found;
  }
}


