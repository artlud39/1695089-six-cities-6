import {BaseController, HttpError, HttpMethod, ValidateObjectIdMiddleware} from '../../libs/rest/index.js';
import {Component} from '../../types/index.js';
import {inject, injectable} from 'inversify';
import {Request, Response} from 'express';
import {Logger} from '../../libs/logger/index.js';
import {OfferService} from './offer-service.interface.js';
import {fillDTO} from '../../helpers/index.js';
import {OfferRdo} from './rdo/offer.rdo.js';
import {UpdateOfferRequest} from './types/update-offer-request.type.js';
import {StatusCodes} from 'http-status-codes';
import {CreateOfferRequest} from './types/create-offer-requset.type.js';


@injectable()
export class OfferController extends BaseController {

  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController...');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
    this.addRoute({path: '/:offerId', method: HttpMethod.Put, handler: this.update});
    this.addRoute({path: '/:offerId', method: HttpMethod.Delete, handler: this.delete});
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.indexId,
      middlewares: [new ValidateObjectIdMiddleware('offerId')]
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public async create(
    {body}: CreateOfferRequest,
    res: Response
  ): Promise<void> {
    const result = await this.offerService.create(body);

    this.created(res, fillDTO(OfferRdo, result));
  }

  public async update({body, params}: UpdateOfferRequest, res: Response): Promise<void> {
    const offer = this.offerService.updateById(String(params.offerId), body);
    const responseData = fillDTO(OfferRdo, offer);
    this.ok(res, responseData);
  }

  public async delete({params}: Request, res: Response): Promise<void> {
    const existsOffer = await this.offerService.deleteById(params.offerId);

    if (!existsOffer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with the specified ID:«${params.offerId}» not found.`,
        'OfferController',
      );
    }

    this.noContent(res, existsOffer);
  }

  public async indexId({params}: Request, res: Response): Promise<void> {
    const existsOffer = await this.offerService.findById(params.offerId);

    if (!existsOffer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with the specified ID:«${params.offerId}» not found.`,
        'OfferController',
      );
    }

    this.ok(res, fillDTO(OfferRdo, existsOffer));
  }
}
