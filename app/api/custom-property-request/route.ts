import { customPropertyRequestFormSchema } from "@/components/forms/properties/schema";
import config from "@/lib/config";
import prisma from "@/prisma/client";
import { parseMessage } from "@/services";
import { sendMail } from "@/services/mail-service";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    const data = await request.json();
    const validation = await customPropertyRequestFormSchema.safeParseAsync(data);

    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 });
    }

    const adminUsers = await prisma.user.findMany({
        where: { isActive: true, isSuperUser: true },
    });

    const clientMessage = parseMessage<{
        client_name: string;
        client_email: string;
        propertyType: string;
        features: string;
    }>(
        {
            client_name: validation.data.name,
            client_email: validation.data.email,
            propertyType: validation.data.propertyType,
            features: validation.data.features,
        },
        config.MESSAGE.CUSTOM_REQUEST_PROPERTY_CLIENT,
    );

    const tasks = [
        sendMail({
            toEmail: validation.data.email,
            subject: "Custom Property Request",
            text: clientMessage,
        }),
        ...adminUsers
            .filter((user) =>
                config.contact.contactPeople.findIndex(
                    (person) => person.email === user.email,
                ) !== -1,
            )
            .map((user) =>
                sendMail({
                    toEmail: user.email,
                    subject: "New Custom Property Request",
                    text: parseMessage<{
                        staff_name: string;
                        client_name: string;
                        features: string;
                        client_phone: string;
                        client_email: string;
                    }>(
                        {
                            staff_name: user.name,
                            client_name: validation.data.name,
                            features: validation.data.features,
                            client_phone: validation.data.phoneNumber.toString(),
                            client_email: validation.data.email,
                        },
                        config.MESSAGE.CUSTOM_REQUEST_PROPERTY_ADMIN,
                    ),
                }),
            ),
        ...config.contact.contactPeople.map((person) =>
            sendMail({
                toEmail: person.email,
                subject: "New Custom Property Request",
                text: parseMessage<{
                    staff_name: string;
                    client_name: string;
                    features: string;
                    client_phone: string;
                    client_email: string;
                }>(
                    {
                        staff_name: person.name,
                        client_name: validation.data.name,
                        features: validation.data.features,
                        client_phone: validation.data.phoneNumber.toString(),
                        client_email: validation.data.email,
                    },
                    config.MESSAGE.REQUEST_PROPERTY_ADMIN,
                ),
            }),
        ),
    ];
    const info = await Promise.all(tasks);
    console.log(info);
    return NextResponse.json({});
};
