import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "./schemas/product.schema";
import { ResponseProductDto } from "./dto/response-product.dto";

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>
  ) {}

  async create(createProductDto: CreateProductDto): Promise<ResponseProductDto> {
    const data = new this.productModel({
      title: createProductDto.title,
      description: createProductDto.description,
      isActive: true
    });

    const product = await data.save();

    return {
      id: product.id,
      title: product.title,
      description: product?.description,
    };
  }

  async findAll(): Promise<ResponseProductDto[]> {
    const products = await this.productModel.find().exec();

    return products.map((product) => ({
      id: product.id,
      title: product.title,
      description: product?.description,
    }))
  }

  async findOne(id: string) {
    return await this.productModel.findById(id);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return await this.productModel.updateOne({id}, updateProductDto);
  }

  async remove(id: string) {
    return await this.productModel.deleteOne({id});
  }
}
