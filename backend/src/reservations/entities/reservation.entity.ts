import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Book } from '../../books/entities/book.entity';

@Entity()
export class Reservation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userName: string;

    @Column({ type: 'date' })
    reservationDate: string;

    @ManyToOne(() => Book, (book) => book.reservations, { onDelete: 'CASCADE' })
    book: Book;
}
