'use client';

import { useTranslations } from 'next-intl';
import Input from '@/components/atoms/Input';
import SearchBarUniversal from '@/components/molecules/SearchBar';
import { ProductDAO } from '@/types/Api';

interface Props {
  quantity: number;
  price: string;
  name: string;
  setQuantity: (q: number) => void;
  setName: (name: string) => void;
  setPrice: (price: string) => void;
  setStock: (stock: number) => void;
  setTax: (tax: number) => void;
  setSelectedProductId: (id: string) => void;
  setTenantIdProduct: (id: string) => void;
  handleAddItem: () => void;
}

export default function SaleForm({
  quantity, price, name,
  setQuantity, setName, setPrice,
  setStock, setTax, setSelectedProductId,
  setTenantIdProduct, handleAddItem
}: Props) {
  const t = useTranslations("makeSale");

  return (
    <div className="flex-1 min-w-[300px] border border-gray-600 bg-transparent p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-white">{t('addItems')}</h2>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-white">{t('product')}</label>
          <SearchBarUniversal
            searchType="products"
            onAddToCart={(item) => {
              const product = item as ProductDAO;
              setName(product.name);
              setPrice(product.salePrice.toString());
              setStock(product.stock);
              setTax(product.tax);
              setSelectedProductId(product.id);
              setTenantIdProduct(product.tenantId);
            }}
            showResults={true}
            placeholder={t('searchPlaceholder')}
          />
        </div>

        <div className="flex flex-row space-x-7">
          <div className="flex flex-col w-full">
            <label className="mb-1 text-sm font-medium text-white">{t("quantity")}</label>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
              placeholder={t('quantityPlaceholder')}
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="mb-1 text-sm font-medium text-white">{t("apricewTx")}</label>
            <Input
              type="number"
              value={price}
              disabled={true}
              placeholder={t('pricePlaceholder')}
            />
          </div>
        </div>

        <button
          onClick={handleAddItem}
          disabled={!name}
          className="px-6 py-2 bg-homePrimary text-white rounded-md hover:bg-homePrimary-400 disabled:bg-gray-500 transition-colors w-full"
        >
          {t('addProduct')}
        </button>
      </div>
    </div>
  );
}
