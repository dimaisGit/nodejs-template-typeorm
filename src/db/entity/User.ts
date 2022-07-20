import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty, Length, Min, MinLength } from "class-validator";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(6, 20)
  username: string;

  @Column()
  @MinLength(6)
  password: string;
}
