import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Reservation } from '../../reservations/entities/reservation.entity';
import { Review } from '../../reviews/entities/review.entity';


@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    author: string;

    @Column('float', { default: 0 })
    rating: number;

    @Column({ default: 'Available' })
    availability: string;

    @Column({ default: 0 })
    copiesAvailable: number;

    @Column({ default: 0 })
    totalCopies: number;

    @Column({ nullable: true })
    coverImage: string;

    @Column({ nullable: true })
    genre: string;

    @Column({ nullable: true })
    isbn: string;

    @Column({ nullable: true })
    publisher: string;

    @Column({ nullable: true })
    publicationYear: number;

    @Column({ nullable: true })
    pageCount: number;

    @Column('text', { nullable: true })
    description: string;



    @OneToMany(() => Reservation, (reservation) => reservation.book)
    reservations: Reservation[];

    @OneToMany(() => Review, (review) => review.book)
    reviews: Review[];
}
