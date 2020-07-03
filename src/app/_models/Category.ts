import { Guid } from 'guid-typescript';
import { Product } from './Product';

export interface Category {
    id: Guid;
    name: string;
    products: Product[];
}
