import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { IsNotEmpty, Length, Min, MinLength } from "class-validator";
import { AuthToken } from "./AuthToken";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  @Length(6, 20)
  username: string;

  @Column()
  @MinLength(6)
  password: string;

  @OneToMany(() => AuthToken, (authToken) => authToken.user, {
    cascade: true,
  })
  authTokens: AuthToken[];
}
