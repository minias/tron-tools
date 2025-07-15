// src/lib/abiEncoder.ts

import { Interface } from 'ethers';
import bs58check from 'bs58check';
import { Buffer } from 'buffer';

/**
 * Tron 주소 (Base58Check) -> 0x hex address 변환
 * @param address Tron 주소 (예: T...)
 * @returns 0x-prefixed 이더리움 hex 주소
 */
export function tronAddressToHex(address: string): string {
  const decoded = bs58check.decode(address);
  if (decoded[0] !== 0x41) {
    throw new Error(`잘못된 Tron 주소: ${address}`);
  }
  return '0x' + Buffer.from(decoded.slice(1)).toString('hex');
}

const iface = new Interface([
  'function transferFrom(address from, address to, uint256 value)',
  'function transfer(address to, uint256 value)',
  'function approve(address spender, uint256 value)',
  'function allowance(address owner, address spender)'
]);

/**
 * transferFrom 함수 인코딩
 */
export function encodeTransferFrom(from: string, to: string, amount: bigint | number): string {
  console.log(from,to)
  console.log(amount)
  const fromHex = tronAddressToHex(from);
  const toHex = tronAddressToHex(to);
  return iface.encodeFunctionData('transferFrom', [fromHex, toHex, amount]);
}

/**
 * transfer 함수 인코딩
 */
export function encodeTransfer(to: string, amount: bigint | number): string {
  const toHex = tronAddressToHex(to);
  return iface.encodeFunctionData('transfer', [toHex, amount]);
}

/**
 * approve 함수 인코딩
 */
export function encodeApprove(spender: string, amount: bigint | number): string {
  const spenderHex = tronAddressToHex(spender);
  return iface.encodeFunctionData('approve', [spenderHex, amount]);
}

/**
 * allowance 함수 인코딩
 */
export function encodeAllowance(owner: string, spender: string): string {
  const ownerHex = tronAddressToHex(owner);
  const spenderHex = tronAddressToHex(spender);
  return iface.encodeFunctionData('allowance', [ownerHex, spenderHex]);
}
