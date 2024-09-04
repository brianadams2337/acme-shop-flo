import { it, describe, expect } from 'vitest'
import type {
  Attributes,
  CentAmount,
  Product,
  RFC33339Date,
} from '@scayle/storefront-nuxt'
import {
  getFilteredAttributeGroups,
  getAdvancedAttributes,
} from '~/utils/attribute'

describe('attribute', () => {
  describe('getFilteredAttributeGroups', () => {
    const attributes = {
      jacketStyle: {
        id: 7071,
        key: 'jacketStyle',
        label: 'Jackenart',
        type: 'design',
        multiSelect: false,
        values: { id: 2534, label: 'Bomberjacke', value: 'bomberjacke' },
      },
      fastenerType: {
        id: 7076,
        key: 'fastenerType',
        label: 'Verschlussart',
        type: 'design',
        multiSelect: false,
        values: { id: 2500, label: 'Reißverschluss', value: 'reissverschluss' },
      },
      brandLogo: {
        id: 20000,
        key: 'brandLogo',
        label: 'Brand logo',
        type: '',
        multiSelect: false,
        values: { id: 2259, label: 'ADIDAS ORIGINALS', value: '' },
      },
      name: {
        id: 20005,
        key: 'name',
        label: 'Name',
        type: '',
        multiSelect: false,
        values: {
          id: 20005,
          label: "Jacke 'Premium Essentials'",
          value: 'name',
        },
      },
      pattern: {
        id: 6103,
        key: 'pattern',
        label: 'Muster',
        type: 'design',
        multiSelect: false,
        values: { id: 2280, label: 'Unifarben', value: 'unifarben' },
      },
      fit: {
        id: 7067,
        key: 'fit',
        label: 'Passform',
        type: 'fit_size',
        multiSelect: false,
        values: {
          id: 2443,
          label: 'Normale Passform',
          value: 'normale_passform',
        },
      },
      brand: {
        id: 550,
        key: 'brand',
        label: 'Brand',
        type: '',
        multiSelect: false,
        values: {
          id: 2259,
          label: 'ADIDAS ORIGINALS',
          value: 'adidas_originals',
        },
      },
      extras: {
        id: 7064,
        key: 'extras',
        label: 'Extras',
        type: 'extras',
        multiSelect: true,
        values: [
          { id: 2427, label: 'Weicher Griff', value: 'weicher_griff' },
          { id: 2435, label: 'Ton-in-Ton-Nähte', value: 'tonintonnhte' },
          { id: 2438, label: 'Label-Stickerei', value: 'labelstickerei' },
        ],
      },
      color: {
        id: 1000,
        key: 'color',
        label: 'Farbe',
        type: '',
        multiSelect: true,
        values: [{ id: 2298, label: 'Beige', value: 'beige' }],
      },
      style: {
        id: 7066,
        key: 'style',
        label: 'Style',
        type: 'design',
        multiSelect: false,
        values: { id: 2430, label: 'Urban', value: 'urban' },
      },
      liningType: {
        id: 7072,
        key: 'liningType',
        label: 'Fütterung',
        type: 'design',
        multiSelect: false,
        values: {
          id: 2499,
          label: 'Leicht gefüttert',
          value: 'leicht_gefuettert',
        },
      },
      category: {
        id: 551,
        key: 'category',
        label: 'Master Categories (AG)',
        type: '',
        multiSelect: true,
        values: [
          { id: 2238, label: 'Storefront Boilerplate', value: '1118' },
          { id: 2239, label: 'Storefront Boilerplate|Women', value: '1119' },
          {
            id: 2240,
            label: 'Storefront Boilerplate|Women|Clothing',
            value: '1120',
          },
          {
            id: 2244,
            label: 'Storefront Boilerplate|Women|Clothing|Jackets',
            value: '1124',
          },
        ],
      },
      description: {
        id: 20006,
        key: 'description',
        label: 'Description',
        type: '',
        multiSelect: false,
        values: { id: 20006, label: '', value: 'description' },
      },
      storefrontBadge: {
        id: 6097,
        key: 'storefrontBadge',
        label: 'Badge',
        type: '',
        multiSelect: false,
        values: { id: 2442, label: 'Nachhaltig', value: 'nachhaltig' },
      },
    }
    it('should return correct filtered and formatted attributes', () => {
      const formattedAttributes = getFilteredAttributeGroups(
        attributes as Attributes,
        ['design', 'extras'],
      )

      expect(formattedAttributes).toHaveLength(2)
      expect(formattedAttributes.get('design')).toStrictEqual([
        'Jackenart: Bomberjacke',
        'Verschlussart: Reißverschluss',
        'Muster: Unifarben',
        'Style: Urban',
        'Fütterung: Leicht gefüttert',
      ])
      expect(formattedAttributes.get('extras')).toStrictEqual([
        'Weicher Griff',
        'Ton-in-Ton-Nähte',
        'Label-Stickerei',
      ])
    })
  })

  describe('getAdvancedAttributes', () => {
    const product: Product = {
      id: 205651,
      isActive: true,
      isSoldOut: false,
      isNew: false,
      createdAt: '2024-07-12T23:11:44+00:00' as RFC33339Date,
      updatedAt: '2024-08-31T08:48:37+00:00',
      attributes: {
        style: {
          id: 7066,
          key: 'style',
          label: 'Style',
          type: 'design',
          multiSelect: false,
          values: { id: 2430, label: 'Urban', value: 'urban' },
        },
        color: {
          id: 1000,
          key: 'color',
          label: 'Farbe',
          type: '',
          multiSelect: true,
          values: [{ id: 2298, label: 'Beige', value: 'beige' }],
        },
        brand: {
          id: 550,
          key: 'brand',
          label: 'Brand',
          type: '',
          multiSelect: false,
          values: {
            id: 2259,
            label: 'ADIDAS ORIGINALS',
            value: 'adidas_originals',
          },
        },
        extras: {
          id: 7064,
          key: 'extras',
          label: 'Extras',
          type: 'extras',
          multiSelect: true,
          values: [
            { id: 2427, label: 'Weicher Griff', value: 'weicher_griff' },
            { id: 2435, label: 'Ton-in-Ton-Nähte', value: 'tonintonnhte' },
            { id: 2438, label: 'Label-Stickerei', value: 'labelstickerei' },
          ],
        },
        storefrontBadge: {
          id: 6097,
          key: 'storefrontBadge',
          label: 'Badge',
          type: '',
          multiSelect: false,
          values: { id: 2442, label: 'Nachhaltig', value: 'nachhaltig' },
        },
        category: {
          id: 551,
          key: 'category',
          label: 'Master Categories (AG)',
          type: '',
          multiSelect: true,
          values: [
            { id: 2238, label: 'Storefront Boilerplate', value: '1118' },
            { id: 2239, label: 'Storefront Boilerplate|Women', value: '1119' },
            {
              id: 2240,
              label: 'Storefront Boilerplate|Women|Clothing',
              value: '1120',
            },
            {
              id: 2244,
              label: 'Storefront Boilerplate|Women|Clothing|Jackets',
              value: '1124',
            },
          ],
        },
        pattern: {
          id: 6103,
          key: 'pattern',
          label: 'Muster',
          type: 'design',
          multiSelect: false,
          values: { id: 2280, label: 'Unifarben', value: 'unifarben' },
        },
        fastenerType: {
          id: 7076,
          key: 'fastenerType',
          label: 'Verschlussart',
          type: 'design',
          multiSelect: false,
          values: {
            id: 2500,
            label: 'Reißverschluss',
            value: 'reissverschluss',
          },
        },
        jacketStyle: {
          id: 7071,
          key: 'jacketStyle',
          label: 'Jackenart',
          type: 'design',
          multiSelect: false,
          values: { id: 2534, label: 'Bomberjacke', value: 'bomberjacke' },
        },
        description: {
          id: 20006,
          key: 'description',
          label: 'Description',
          type: '',
          multiSelect: false,
          values: { id: 20006, label: '', value: 'description' },
        },
        name: {
          id: 20005,
          key: 'name',
          label: 'Name',
          type: '',
          multiSelect: false,
          values: {
            id: 20005,
            label: "Jacke 'Premium Essentials'",
            value: 'name',
          },
        },
        fit: {
          id: 7067,
          key: 'fit',
          label: 'Passform',
          type: 'fit_size',
          multiSelect: false,
          values: {
            id: 2443,
            label: 'Normale Passform',
            value: 'normale_passform',
          },
        },
        liningType: {
          id: 7072,
          key: 'liningType',
          label: 'Fütterung',
          type: 'design',
          multiSelect: false,
          values: {
            id: 2499,
            label: 'Leicht gefüttert',
            value: 'leicht_gefuettert',
          },
        },
        brandLogo: {
          id: 20000,
          key: 'brandLogo',
          label: 'Brand logo',
          type: '',
          multiSelect: false,
          values: { id: 2259, label: 'ADIDAS ORIGINALS', value: '' },
        },
      },
      advancedAttributes: {
        productName: {
          id: 553,
          key: 'productName',
          label: 'Produktname',
          type: '',
          values: [
            {
              fieldSet: [[{ value: "Jacke 'Premium Essentials'" }]],
              groupSet: [],
            },
          ],
        },
      },
      images: [
        {
          hash: 'images/10be2036a688024d6ef39ff57313e515.png',
          attributes: {
            primaryImage: {
              id: 7061,
              key: 'primaryImage',
              label: 'Primary Image',
              type: '',
              multiSelect: false,
              values: { id: 2433, label: 'true', value: 'true' },
            },
          },
        },
        {
          hash: 'images/2b90f30f4795ec1d68194c10ad64592c.jpg',
          attributes: {
            primaryImage: {
              id: 7061,
              key: 'primaryImage',
              label: 'Primary Image',
              type: '',
              multiSelect: false,
              values: { id: 2433, label: 'true', value: 'true' },
            },
          },
        },
        { hash: 'images/bd8f02b5c483758f7720d3123492d2a7.jpg', attributes: {} },
        { hash: 'images/625b9deac61c797afc599c5d0df58788.jpg', attributes: {} },
        { hash: 'images/68c399fae0ada5a4c77ecbb59fde10b0.jpg', attributes: {} },
      ],
      variants: [
        {
          id: 319657,
          referenceKey: 'ADT5901001000001',
          attributes: {
            size: {
              id: 1001,
              key: 'size',
              label: 'Größe',
              type: 'size',
              multiSelect: false,
              values: { id: 2272, label: 'XS', value: 'xs_1_2' },
            },
          },
          createdAt: '2024-07-12T23:11:44+00:00' as RFC33339Date,
          updatedAt: '2024-08-06T14:41:47+00:00' as RFC33339Date,
          stock: {
            supplierId: 3,
            warehouseId: 58,
            quantity: 0,
            isSellableWithoutStock: false,
          },
          price: {
            currencyCode: 'EUR',
            withTax: 12500 as CentAmount,
            withoutTax: 6250 as CentAmount,
            tax: { vat: { amount: 6250 as CentAmount, rate: 0.999999 } },
            appliedReductions: [
              {
                category: 'sale',
                type: 'relative',
                amount: { relative: 0.16, absoluteWithTax: 2400 as CentAmount },
              },
            ],
          },
          lowestPriorPrice: { withTax: null, relativeDifferenceToPrice: null },
        },
      ],
      priceRange: {
        min: {
          currencyCode: 'EUR',
          withTax: 12500 as CentAmount,
          withoutTax: 6250 as CentAmount,
          tax: { vat: { amount: 6250 as CentAmount, rate: 0.999999 } },
          appliedReductions: [
            {
              category: 'sale',
              type: 'relative',
              amount: { relative: 0.16, absoluteWithTax: 2400 as CentAmount },
            },
          ],
        },
        max: {
          currencyCode: 'EUR',
          withTax: 12500 as CentAmount,
          withoutTax: 6250 as CentAmount,
          tax: { vat: { amount: 6250 as CentAmount, rate: 0.999999 } },
          appliedReductions: [
            {
              category: 'sale',
              type: 'relative',
              amount: { relative: 0.16, absoluteWithTax: 2400 as CentAmount },
            },
          ],
        },
      },
      lowestPriorPrice: { withTax: null, relativeDifferenceToPrice: null },
      siblings: [],
      categories: [],
    }

    it('should return correct advanced attribute', () => {
      const advancedAttribute = getAdvancedAttributes({
        product,
        property: 'productName',
      })

      expect(advancedAttribute).toStrictEqual(["Jacke 'Premium Essentials'"])
    })
  })
})
