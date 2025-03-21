import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'do_types',
})
export default class DO_Types extends Model {
  @Column(DataType.STRING)
  name: string;
}
