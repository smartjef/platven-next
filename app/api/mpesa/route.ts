import { mpesaPaymentSchema } from "@/components/forms/payment/schem";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { Mpesa } from "daraja.js";

export const POST = async (request: NextRequest) => {
  try {
    const data = (await request.json()) ?? {};
    const validation = await mpesaPaymentSchema.safeParseAsync(data);
    if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });
    const { phoneNumber, property: propertyId } = validation.data;
    const property = await prisma.property.findUnique({
      where: {
        id: propertyId,
        OR: [{ payment: { complete: false } }, { payment: null }],
      },
    });
    //   Ensure property exist and is not paid
    if (!property)
      return NextResponse.json(
        { property: { _errors: ["Property dont exist or already paid"] } },
        { status: 400 },
      );
    // Instatiate mpesa
    const app = new Mpesa({
      debug: true,
      consumerKey: process.env.MPESA_CONSUMER_KEY as string,
      consumerSecret: process.env.MPESA_CONSUMER_SECRETE as string,
      organizationShortCode: Number(process.env.MPESA_SHORT_CODE),
      initiatorPassword: process.env.MPESA_INITIATOR_PASSWORD as string,
    });

    const amount = 1;
    // Trigger stk push
    const response = await app
      .stkPush()
      .phoneNumber(Number(`254${phoneNumber}`))
      .amount(amount)
      .accountNumber(process.env.MPESA_ACCOUNT_REF as string)
      .lipaNaMpesaPassKey(process.env.MPESA_PASS_KEY as string)
      .paymentType("CustomerBuyGoodsOnline")
      // .description("")
      //   .shortCode("174379")
      .send();
    // Save push results
    const {
      data: {
        MerchantRequestID,
        CheckoutRequestID,
        ResponseCode,
        ResponseDescription,
        CustomerMessage,
      },
    } = response;

    let payment = await prisma.payment.findUnique({
      where: { propertyId: property.id },
    });
    if (payment) {
      payment = await prisma.payment.update({
        where: { id: payment.id },
        data: {
          merchantRequestId: MerchantRequestID,
          checkoutRequestId: CheckoutRequestID,
          amount,
          complete: false,
          resultCode: ResponseCode,
          resultDescription: ResponseDescription,
          description: CustomerMessage,
          propertyId: property.id,
          phoneNumber: `254${phoneNumber}`,
        },
      });
    } else {
      // Create Payments
      payment = await prisma.payment.create({
        data: {
          merchantRequestId: MerchantRequestID,
          checkoutRequestId: CheckoutRequestID,
          amount,
          complete: false,
          resultCode: ResponseCode,
          resultDescription: ResponseDescription,
          description: CustomerMessage,
          propertyId: property.id,
          phoneNumber: `254${phoneNumber}`,
        },
      });
    }

    return NextResponse.json(payment);
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(
      { detail: error?.message ?? "Internal server error" },
      { status: error?.status ?? 500 },
    );
  }
};
