import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Book } from '../books/entities/book.entity';


@Injectable()
export class ReservationsService {
    constructor(
        @InjectRepository(Reservation)
        private reservationsRepository: Repository<Reservation>,

        @InjectRepository(Book)
        private booksRepository: Repository<Book>,
    ) { }

    async create(createReservationDto: CreateReservationDto) {
        const { bookId, ...data } = createReservationDto;
        const book = await this.booksRepository.findOneBy({ id: bookId });
        if (!book) {
            throw new Error('Book not found');
        }
        const reservation = this.reservationsRepository.create({
            ...data,
            book,
        });
        return this.reservationsRepository.save(reservation);
    }

    findAll() {
        return this.reservationsRepository.find({ relations: ['book'] });
    }
}
