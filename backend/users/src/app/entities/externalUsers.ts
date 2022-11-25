import { ObjectType, Field, Directive } from '@nestjs/graphql';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrganizationTypes } from './organizationTypes';
import { Regions } from './regions';

@ObjectType()
@Directive('@key(fields: "id")')
@Entity({ name: 'external_user' })
export class ExternalUsers {
  @Field()
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Index('IDX_externaluser_user_id')
  @Column({
    unique: true,
    length: 50,
    name: 'user_id',
    nullable: true,
    default: null,
  })
  userId: string;

  @Field()
  @Column({ length: 64, name: 'first_name' })
  firstName: string;

  @Field()
  @Column({ length: 64, name: 'last_name' })
  lastName: string;

  @Field()
  @Column({ length: 200, name: 'address_line' })
  addressLine: string;

  @Field()
  @Column({ length: 50, name: 'city' })
  city: string;

  @Field()
  @Column({ length: 50, name: 'province' })
  province: string;

  @Field()
  @Column({ length: 50, name: 'country' })
  country: string;

  @Field()
  @Column({ length: 20, name: 'postal_code' })
  postalCode: string;

  @Field()
  @Column({ length: 320, name: 'email' })
  email: string;

  @Field()
  @Column({ length: 40, name: 'phoneNumber' })
  phoneNumber: string;

  @Field()
  @Column({ length: 250, name: 'industry', nullable: true })
  industry: string;

  @Field()
  @Column({ length: 250, name: 'organization', nullable: true })
  organization: string;

  @Field(() => Boolean)
  @Column({ name: 'is_gst_exempt', default: false })
  isGstExempt: boolean;

  @Field(() => Boolean)
  @Column({ name: 'is_billing_contact', default: true })
  isBillingContact: boolean;

  @Column({ length: 10, name: 'user_work_status', nullable: false })
  userWorkStatus: string;

  @Column({ length: 25, name: 'user_fn_status', nullable: false })
  userFNStatus: string;

  @Column({ name: 'organization_type_id', nullable: true })
  @Field()
  organizationTypeId?: string;

  @Column({ name: 'region_id', nullable: true })
  @Field()
  regionId?: string;

  @ManyToOne(() => OrganizationTypes, (org) => org.mapping)
  @JoinColumn({ name: 'organization_type_id' })
  @Field()
  organizationType: OrganizationTypes;

  @ManyToOne(() => Regions, (region) => region.mapping)
  @JoinColumn({ name: 'region_id' })
  @Field()
  region: Regions;

  @Field(() => Boolean)
  @Column()
  isProfileVerified: boolean;
}
