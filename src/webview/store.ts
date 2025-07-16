// src/webview/store.ts
import { writable } from 'svelte/store';
export type Page = 'TransferEncoder' | 'ResourceStatus' | 'AddressToHex';
export const currentPage = writable<Page>('TransferEncoder');
//export const currentPage = writable<'TransferEncoder' | 'AddressToHex'>('TransferEncoder');
//export const currentPage = writable<'TransferEncoder' | 'AddressToHex'>('TransferEncoder' as const);
