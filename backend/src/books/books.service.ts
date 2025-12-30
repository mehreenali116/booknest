import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book)
        private booksRepository: Repository<Book>,
    ) { }

    create(createBookDto: CreateBookDto) {
        const book = this.booksRepository.create(createBookDto);
        return this.booksRepository.save(book);
    }

    findAll() {
        return this.booksRepository.find({ relations: ['reservations'] });
    }

    findOne(id: number) {
        return this.booksRepository.findOne({ where: { id }, relations: ['reservations'] });
    }

    async update(id: number, updateBookDto: UpdateBookDto) {
        await this.booksRepository.update(id, updateBookDto);
        return this.findOne(id);
    }

    remove(id: number) {
        return this.booksRepository.delete(id);
    }
}
