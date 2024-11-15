import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
  timestamps: true
})
export class Product {
  @Prop()
  title: String;

  @Prop()
  description: String;

  @Prop()
  isActive?: Boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
