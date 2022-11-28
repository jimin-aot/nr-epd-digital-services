import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Resource, RoleMatchingMode, Roles } from 'nest-keycloak-connect';
import { FetchRegionResponse } from '../dto/reponse/fetchRegionResponse';

import { Region } from '../entities/region';
import { RegionService } from '../services/region.service';

/**
 * Resolver for Region
 */
@Resolver(() => Region)
@Resource('backend')
export class RegionResolver {
  constructor(private readonly regionServiceLayer: RegionService) {}

  /**
   * Find All For Regions
   */
  @Roles({ roles: ['adminbackend'], mode: RoleMatchingMode.ANY })
  @Query(() => FetchRegionResponse, { name: 'regions' })
  findAll() {
    return this.regionServiceLayer.findAll();
  }

  /**
   * Find One Region
   * @param id region id
   * @returns Specific Region
   */
  @Roles({ roles: ['adminbackend'], mode: RoleMatchingMode.ANY })
  @Query(() => Region, { name: 'region' })
  findOne(@Args('id', { type: () => Int }) id: string) {
    return this.regionServiceLayer.findOne(id);
  }
}
