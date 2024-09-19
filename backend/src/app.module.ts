import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CafesModule } from './cafes/cafes.module';
import { EmployeesModule } from './employees/employees.module';

@Module({
  imports: [DatabaseModule, CafesModule, EmployeesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
