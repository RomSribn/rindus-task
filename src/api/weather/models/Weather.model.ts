import { DataTypes } from 'sequelize';
import { City } from '@api/cities/models/City.model';
import { Condition } from '@api/weather/models/Condition.model';
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
  BelongsTo
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
  id: string;

  @AllowNull(true)
  @Column
  date: Date;

  @AllowNull(false)
  @Column
  temperature: number;

  @ForeignKey(() => City)
  @AllowNull(false)
  @Column
  cityId: number;
  @BelongsTo(() => City)
  city?: City;

  @ForeignKey(() => Condition)
  @AllowNull(false)
  @Column
  conditionId: number;
  @BelongsTo(() => Condition)
  condition?: Condition;
}

export { Weather };
