import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Property {
    title: string;
    propertyType: string;
    bedrooms: bigint;
    area: bigint;
    description: string;
    bathrooms: bigint;
    price: bigint;
    location: string;
}
export type Time = bigint;
export interface ContactEntry {
    name: string;
    email: string;
    message: string;
    timestamp: Time;
    phone: string;
}
export interface backendInterface {
    addProperty(property: Property): Promise<void>;
    getAllContactEntries(): Promise<Array<ContactEntry>>;
    getAllProperties(): Promise<Array<Property>>;
    getProperty(location: string): Promise<Property | null>;
    submitContactForm(name: string, email: string, phone: string, message: string): Promise<void>;
}
