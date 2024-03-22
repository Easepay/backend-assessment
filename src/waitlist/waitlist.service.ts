import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import {
  ApiResponseInterface,
  ResponseStatus
} from '../common/api.response.interface';
import { ProductWaitlist } from '../entities/product.waitlist.entity';
import { ProductWaitlistDTO } from './dto/product.waitlist.dto';
import { ProductWaitlistResponseDto } from './dto/product.waitlistresponse.dt';

@Injectable()
export class WaitlistService {
  constructor(
    @InjectRepository(ProductWaitlist)
    private productWaitlist: Repository<ProductWaitlist>,
  ) {}

  /**
   * @function joinWaitlist - a function to add  user's name and email to the waitlist table
   * to do this, see if name already exist,
   * if yes, send conflict error, else add the name
   * send email to user that they have successfully join the wait list
   * @returns success or error response
   */
  async joinWaitlist({ email, fullname }: ProductWaitlistDTO) {
    try {
      // see if user record already exist in the waitlist
      const record = await this.productWaitlist.findOne({
        where: { email },
      });

      if (record) {
        return new HttpException(
          'The email provided already exist on the wait list',
          HttpStatus.CONFLICT,
        );
      }

      // create a new record if not exist
      const newWaitlistRecord = this.productWaitlist.create();
      newWaitlistRecord.id = uuidv4();
      newWaitlistRecord.fullname = fullname;
      newWaitlistRecord.email = email.trim();
      await newWaitlistRecord.save();

      // send email notification to the user
      // const emailQueueData: EmailQueuePayloadInterface = {
      //   emailSubject: 'Easepay wait list',
      //   recipient: email.trim(),
      //   emailTemplate: EmailTemplateName.WAITLIST,
      //   data: {
      //     fullname: newWaitlistRecord.fullname,
      //   },
      // };
      // await this.emailQueue.add(emailQueueData);

      // build up the response
      const response: ApiResponseInterface = {
        message: 'user successfully added to wait list',
        status: ResponseStatus.SUCCESS,
        data: {
          ...newWaitlistRecord,
        },
      };

      return response;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // update waitlist
  async updateWaitList(id: string, email: string) {
    try {
        const exisitngWaitList = await this.productWaitlist.findOne({

          where: {id}
        })
        if(!exisitngWaitList){
          throw new BadRequestException("WaitList Does Not Exist")
        }
        await this.productWaitlist.update({
         id 
        }, {
          email
        })
        const response : ApiResponseInterface = {
          message: "Wait list updated successfully",
          status: ResponseStatus.SUCCESS,
          data: {}
        }
        return response
    } catch (error) {
      throw new HttpException(error.messaage, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  /**
   * @function exitWaitList  - stop receiving news letter
   */
  async exitWaitlist(email: string) {
    try {
      const existingRecord = await this.productWaitlist.findOne({
        where: { email },
      });

      if (!existingRecord) {
        throw new BadRequestException(
          'You have not subscribed to our waitlist',
        );
      }
     const responseData: ProductWaitlistResponseDto = {
      email: existingRecord.email,
      fullname: existingRecord.fullname
     }
      return {
        status: ResponseStatus.SUCCESS,
        message: 'Wait list Record',
        data: responseData,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * @function exitWaitList  - stop receiving news letter
   */
   async deleteWaitlist(email: string) {
    try {
      const existingRecord = await this.productWaitlist.findOne({
        where: { email },
      });

      if (!existingRecord) {
        throw new BadRequestException(
          'You have not subscribed to our waitlist',
        );
      }
    await this.productWaitlist.delete({id: existingRecord.id})
      return {
        status: ResponseStatus.SUCCESS,
        message: 'Waitlist Record Delete',
        data: {},
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
