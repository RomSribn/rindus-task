import { DataTypes } from 'sequelize';
import { City } from '../../cities/models/City.model';
import { Condition } from '../../weather/models/Condition.model';
import {
  Table,
  Unique,
  Default,
  Column,
  PrimaryKey,
  IsUUID,
  AllowNull,
  Model,
  ForeignKey,
  BelongsTo,
  HasMany,
  Index
} from 'sequelize-typescript';

@Table({
  tableName: 'Weather',
  timestamps: false,
})
class Weather extends Model<Weather> {
  @IsUUID(4)
  @PrimaryKey
  @Unique
  @Default(DataTypes.UUIDV4)
  @Column
  wheather_id: string;

  @AllowNull(true)
  @Column
  date: Date;

  @AllowNull(false)
  @Column
  currentWheather: string;

  @AllowNull(false)
  @Column
  temperature: number;

  @Index({
    name: 'Weather_city_idx',
    unique: false,
    using: 'BTREE',
    order: 'ASC',
  })
  @ForeignKey(() => City)
  @AllowNull(false)
  @Column
  cityId: number;
  @BelongsTo(() => City)
  city?: City;

  @HasMany(() => Condition)
  condition: Condition[];
}

export { Weather };
