import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm"

@Entity("config")
export class ConfigEntity {
  @PrimaryGeneratedColumn("uuid")
      id: string

  @Column({ name: "key", type: "varchar", length: 100 })
      key: ConfigKey

  //value is as object
  @Column({ name: "value", type: "varchar", length: 200 })
      value: string

  @CreateDateColumn({ name: "created_at" })
      createdAt: Date

  @UpdateDateColumn({ name: "updated_at" })
      updatedAt: Date
}

export enum ConfigKey {
  Network = "network",
}
