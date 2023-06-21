import { Weather } from './Weather.model';
import { Table, Unique, Column, PrimaryKey, AllowNull, Model, HasMany, AutoIncrement } from 'sequelize-typescript';

@Table({
  tableName: 'Condition',
  timestamps: false,
})
class Condition extends Model<Condition> {
  @PrimaryKey
  @Unique
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column
  name: string;

  @HasMany(() => Weather)
  condition: Weather[];
}

export { Condition };
