import { z } from 'zod';

interface Terminal {
  id: string;
  name: string;
  city: string;
  address: string;
  postalCode: string;
}

async function getTerminals(): Promise<Terminal[]> {
  const response = await fetch('https://beautybella-lpexpress.vercel.app/api/lpexpress');

  if (!response.ok) {
    throw new Error('Failed to fetch terminals');
  }

  const terminals = await response.json();
  return terminals.sort((a: Terminal, b: Terminal) => a.city.localeCompare(b.city));
}

interface CreateParcelParams {
  idRef: string;
  plan: {
    code: string;
    size: string;
    weight: number;
  };
  parcel: {
    type: string;
    size: string;
    weight: number;
    partCount: number;
    document: boolean;
  };
  receiver: {
    name: string;
    phone: string;
    email: string;
    terminalId: string;
    address: {
      countryCode: string;
      postalCode: string;
      street: string;
      locality: string;
    };
  };
  senderAddressId: string;
}

async function createParcel(params: CreateParcelParams) {
  const response = await fetch('https://beautybella-lpexpress.vercel.app/api/lpexpress', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'createParcel',
      ...params
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create parcel');
  }

  return response.json();
}

async function initiateShipping(orderId: string) {
  const response = await fetch('https://beautybella-lpexpress.vercel.app/api/lpexpress', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'initiateShipping',
      orderId,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to initiate shipping');
  }

  return response.json();
}

async function getShippingLabel(orderId: string) {
  const response = await fetch('https://beautybella-lpexpress.vercel.app/api/lpexpress', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'getShippingLabel',
      orderId,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to get shipping label');
  }

  return response.blob();
}

interface SenderAddress {
  name: string;
  contacts: {
    phone: string;
    email: string;
  };
  address: {
    street: string;
    building: string;
    postalCode: string;
    locality: string;
    municipality: string;
    countryCode: string;
  };
}

async function createSenderAddress(senderAddress: SenderAddress) {
  const response = await fetch('https://beautybella-lpexpress.vercel.app/api/lpexpress', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'createSenderAddress',
      ...senderAddress,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create sender address');
  }

  return response.json();
}

export const lpExpressClient = {
  getTerminals,
  createParcel,
  initiateShipping,
  getShippingLabel,
  createSenderAddress,
};

export { getTerminals }