import React from 'react';
import { PriceTag } from '../atoms/pricing/PriceTag';
import { FeatureItem } from '../atoms/pricing/FeatureItem';
import { Button } from '../atoms/pricing/Button';

interface PricingCardProps {
  title: string;
  price: number;
  period: 'mo' | 'yr';
  features: string[];
  highlighted?: boolean;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  period,
  features,
  highlighted = false,
}) => {
  return (
    <div
      className={`bg-black rounded-lg p-6 border flex flex-col justify-between ${
        highlighted ? 'border-homePrimary' : 'border-gray-700'
      }`}
    >
      <div>
        <div className="mb-5">
          <PriceTag price={price} period={period} />
          <h3 className="text-gray-400 mt-1">{title}</h3>
        </div>

        <div className="border-t border-gray-800 my-6 pt-6">
          {features.map((feature, index) => (
            <FeatureItem key={index} text={feature} />
          ))}
        </div>
      </div>

      <div className="mt-5">
        <Button text="Get Started" primary={highlighted} />
      </div>
    </div>
  );
};