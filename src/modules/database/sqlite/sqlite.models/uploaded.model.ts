import {
  AllowNull,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'uploaded',
  timestamps: true,
})
export default class Uploaded extends Model {
  @AllowNull(false)
  @Column(DataType.INTEGER)
  r_docattach_id: number;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  is_uploaded: boolean;

  @AllowNull(false)
  @Column(DataType.STRING)
  file_name: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  file_path: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  description: string;
}
