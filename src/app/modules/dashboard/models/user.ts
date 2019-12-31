import { Company } from './company';
import { Address } from './address';

export interface User {
    id: number;
    name: string;
    username?: string;
    email: string;
    address?: Address;
    phone?: number;
    website?: string;
    company?: Company;
    country?: string;
}