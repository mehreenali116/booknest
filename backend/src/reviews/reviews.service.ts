import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { Book } from '../books/entities/book.entity';

@Injectable()
export class ReviewsService {
    constructor(
        @InjectRepository(Review)
        private reviewsRepository: Repository<Review>,

        @InjectRepository(Book)
        private booksRepository: Repository<Book>,
    ) { }

    async create(createReviewDto: CreateReviewDto) {
        const { bookId, ...reviewData } = createReviewDto;
        const book = await this.booksRepository.findOneBy({ id: bookId });
        if (!book) {
            throw new Error('Book not found');
        }
        const review = this.reviewsRepository.create({
            ...reviewData,
            book,
        });
        return this.reviewsRepository.save(review);
    }

    findAll() {
        return this.reviewsRepository.find({ relations: ['book'] });
    }
}
