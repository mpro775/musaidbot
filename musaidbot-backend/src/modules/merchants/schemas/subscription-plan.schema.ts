// src/merchants/schemas/subscription-plan.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum PlanTier {
  Free = 'free',
  Starter = 'starter',
  Business = 'business',
  Enterprise = 'enterprise',
}

@Schema({ _id: false })
export class SubscriptionPlan {
  @Prop({ required: true, enum: Object.values(PlanTier) })
  tier: PlanTier;

  @Prop({ required: true })
  startDate: Date;

  @Prop()
  endDate?: Date;
  @Prop({ type: [String], default: [] })
  features: string[];
}

export type SubscriptionPlanDocument = SubscriptionPlan & Document;
export const SubscriptionPlanSchema =
  SchemaFactory.createForClass(SubscriptionPlan);
