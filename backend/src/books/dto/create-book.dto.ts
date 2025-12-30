export class CreateBookDto {
    title: string;
    author: string;
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
