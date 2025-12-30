import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { Reservation } from './entities/reservation.entity';
import { BooksModule } from '../books/books.module';


@Module({
    imports: [TypeOrmModule.forFeature([Reservation]), BooksModule],
    controllers: [ReservationsController],
    providers: [ReservationsService],
})
export class ReservationsModule { }
