import { Table, Unique, Column, PrimaryKey, AllowNull, Model } from 'sequelize-typescript';

@Table({
  tableName: 'City',
  timestamps: false,
})
class City extends Model<City> {
  @PrimaryKey
  @Unique
  @Column
  city_id: number;

  @AllowNull(false)
  @Column
  name: string;
}

export { City };
