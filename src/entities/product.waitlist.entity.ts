/**
 *  the product wait list entity
 * the entity shall be used to interface the "waitlist" module
 * the waitlist module is responsible for tracking the number of individuals and corporate organizations intending the use the product once it's launched
 */

import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('product_waitlist')
export class ProductWaitlist extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullname: string;

  @Column()
  email: string;

  // the date the record was created
  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  // the date the user detail was updated
  @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
