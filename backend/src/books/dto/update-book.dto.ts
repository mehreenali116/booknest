import { CreateBookDto } from './create-book.dto';

export class UpdateBookDto {
    title?: string;
    author?: string;
    rating?: number;
    availability?: string;
    copiesAvailable?: number;
    totalCopies?: number;
    coverImage?: string;
    genre?: string;
    isbn?: string;
    publisher?: string;
    publicationYear?: number;
    pageCount?: number;
    description?: string;
    reviews?: any[];
}
