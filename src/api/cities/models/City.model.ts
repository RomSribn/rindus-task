import { Weather } from '@api/weather/models/Weather.model';
import { Table, Unique, Column, PrimaryKey, AllowNull, Model, AutoIncrement, HasMany } from 'sequelize-typescript';

@Table({
  tableName: 'City',
  timestamps: false,
})
class City extends Model<City> {
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

export { City };
