import { lpExpressClient } from './lpexpress';

const DEFAULT_SENDER = {
  name: "Beauty by Ella",
  contacts: {
    phone: "+37064027403",
    email: "info@beautybyella.lt"
  },
  address: {
    street: "Giraitės g.",
    building: "60A",
    postalCode: "21143",
    locality: "Rubežius",
    municipality: "Trakų r. sav.",
    countryCode: "LT"
  }
};

interface ShippingDetails {
  orderId: string;
  receiverName: string;
  receiverPhone: string;
  receiverEmail: string;
  terminalId: string;
  weight: number;
  terminal?: {
    city: string;
    address: string;
    postalCode: string;
  };
}

export async function createShipment(details: ShippingDetails) {
  try {
    const senderResponse = await lpExpressClient.createSenderAddress(DEFAULT_SENDER);
    const senderAddressId = senderResponse.id;

    const parcelData = {
      idRef: details.orderId,
      plan: {
        code: 'TERMINAL',
        size: 'M',
        weight: details.weight
      },
      parcel: {
        type: 'PACKAGE', // ✅ Fixed value
        size: 'M',
        weight: details.weight,
        partCount: 1,
        document: false
      },
      receiver: {
        name: details.receiverName,
        phone: details.receiverPhone,
        email: details.receiverEmail,
        terminalId: details.terminalId,
        address: {
          countryCode: 'LT',
          postalCode: details.terminal?.postalCode || '01100',
          street: details.terminal?.address || 'Terminal',
          locality: details.terminal?.city || 'Vilnius'
        }
      },
      senderAddressId
    };

    const parcelResponse = await lpExpressClient.createParcel(parcelData);
    await lpExpressClient.initiateShipping([details.orderId]);
    const labelBlob = await lpExpressClient.getShippingLabel(details.orderId);
    const labelUrl = URL.createObjectURL(labelBlob);

    return {
      success: true,
      trackingNumber: parcelResponse.trackingNumber,
      labelUrl
    };
  } catch (error) {
    console.error('❌ Error creating shipment:', error);
    throw error;
  }
}
