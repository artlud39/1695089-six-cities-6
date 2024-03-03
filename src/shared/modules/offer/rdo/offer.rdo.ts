import {Expose, Type} from 'class-transformer';
import {Amenities, City, Location, PropertyType} from '../../../types/index.js';
import {UserRdo} from '../../user/index.js';

export class OfferRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public publicationDate: Date;

  @Expose()
  public city: City;

  @Expose()
  public imagePreview: string;

  @Expose()
  public photos: string[];

  @Expose()
  public premium: boolean;

  @Expose()
  public favorites: boolean;

  @Expose()
  public houseType: PropertyType;

  @Expose()
  public countRooms: number;

  @Expose()
  public countGuests: number;

  @Expose()
  public rentPrice: number;

  @Expose()
  public amenities: Amenities[];

  @Expose()
  public rating: number;

  @Expose()
  public commentCount: number;

  @Expose()
  public location: Location;

  @Expose()
  @Type(() => UserRdo)
  public user: UserRdo;
}
