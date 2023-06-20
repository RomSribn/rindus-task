import { DataTypes } from 'sequelize';
import { Weather } from './Weather.model';
import { Table, Unique, Column, PrimaryKey, AllowNull, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';

@Table({
  tableName: 'Condition',
  timestamps: false,
})
class Condition extends Model<Condition> {
  @PrimaryKey
  @Unique
  @Column
  condition_id: number;

  @AllowNull(false)
  @Column
  name: string;

  @ForeignKey(() => Weather)
  @AllowNull(false)
  @Column(DataTypes.UUID)
  weatherId: string;
  @BelongsTo(() => Weather)
  weather?: Weather;
}

export { Condition };
