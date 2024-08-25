"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Input } from './ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Heading } from './ui/heading'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { customPropertyRequestFormSchema } from "./forms/properties/schema";
import { useToast } from "./ui/use-toast";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
    ssr: false, // Prevent SSR
});

const CustomProperyRequestForm = () => {
    const propertyTypes = ["Land", "Apartment", "Home", "Rental"];
    const [loading, setLoading] = useState(false);
    type CustomPropertyRequestFormValue = z.infer<typeof customPropertyRequestFormSchema>;
    const form = useForm<CustomPropertyRequestFormValue>({
        resolver: zodResolver(customPropertyRequestFormSchema),
        defaultValues: {
            name: "",
            email: "",
            phoneNumber: "" as any,
            propertyType: "Land",
            features: "",
        },
    });
    const { toast } = useToast();

    const onSubmit = async (data: CustomPropertyRequestFormValue) => {
        try {
            setLoading(true);
            const response = await fetch("/api/custom-property-request", {
                method: "POST",
                body: JSON.stringify(data),
                redirect: "follow",
            });
            if (response.ok) {
                await response.json();
                toast({
                    title: "Success!!",
                    description: "Custom request submition success.",
                });
                form.reset();
            } else {
                if (response.status === 400) {
                    const errors = await response.json();

                    for (const key in errors) {
                        const errorMessage = (errors[key]._errors as string[]).join(",");

                        form.setError(key as any, {
                            message: errorMessage,
                        });
                    }
                }
                console.log();
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div>
                <Heading title={"Can't Get Your Choice Of Property?"} description={"Kindly Email Us Your Preferred Property Details Right Here."} />
            </div>
            <Separator />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-4/5"
                >
                    <div className='flex flex-col md:grid md:grid-cols-2 md:gap-5'>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Enter your name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Enter your email address"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Enter Phone Number</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Enter your phone number"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="propertyType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Property Type</FormLabel>
                                    <Select
                                        disabled={loading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a property type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {propertyTypes.map((propertyType, index) => (
                                                <SelectItem key={index} value={propertyType}>
                                                    {propertyType}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="features"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Features</FormLabel>
                                <FormControl>
                                    <SimpleMDE
                                        placeholder="Enter features ..."
                                        {...field}
                                        className="features-editor"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button disabled={loading} className="ml-auto" type="submit">
                        Send request
                    </Button>
                </form>
            </Form>
        </>
    );
}

export default CustomProperyRequestForm;
