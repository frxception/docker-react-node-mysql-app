import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class CafesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createCafeDto: Prisma.CafesCreateInput) {
    return this.databaseService.cafes.create({ data: createCafeDto });
  }

  async findAll() {
    return this.databaseService.cafes.findMany({});
  }

  async findOne(id: number) {
    return this.databaseService.cafes.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateCafeDto: Prisma.CafesUpdateInput) {
    return this.databaseService.cafes.update({
      where: {
        id,
      },
      data: updateCafeDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.cafes.delete({
      where: {
        id,
      },
    });
  }
}
