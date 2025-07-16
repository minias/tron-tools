// src/lib/abiEncoder.ts
import { Interface } from 'ethers';
// import bs58check from 'bs58check';
// import { Buffer } from 'buffer';
import { TronWeb, utils as TronWebUtils } from 'tronweb';
const tronWeb = new TronWeb({fullHost: 'https://api.trongrid.io'})
// ethers.js ABI 인터페이스 (TRC20 함수들)
export const trc20Interface = new Interface([
  'function transferFrom(address from, address to, uint256 value)',
  'function transfer(address to, uint256 value)',
  'function approve(address spender, uint256 value)',
  'function allowance(address owner, address spender)',
]);

export function tronAddressToHex(address: string): string {
  return tronWeb.address.toHex(address);
}
/*
const tronWeb = new TronWeb({
    fullHost: 'https://api.trongrid.io',
    headers: { "TRON-PRO-API-KEY": 'your api key' },
    privateKey: 'your private key'
})
*/

export function tronHexToAddress(hex: string): string {
  return tronWeb.address.fromHex(hex);
}

/**
 * TRON hex address (ex: 41xxxx...) → Ethereum-style hex address (ex: 0x...)
 */
export function tronHexToEthHex(tronHex: string): string {
  const hex = tronHex.trim().toLowerCase();

  if (!hex.startsWith('41')) {
    throw new Error(`TRON HEX 주소는 '41'로 시작해야 합니다: ${hex}`);
  }

  if (hex.length !== 42) {
    throw new Error(`TRON HEX 주소는 정확히 42자리여야 합니다 (현재 ${hex.length}자리): ${hex}`);
  }

  if (!/^41[0-9a-f]{40}$/.test(hex)) {
    throw new Error(`TRON HEX 주소는 16진수 문자로 구성되어야 합니다: ${hex}`);
  }

  return '0x' + hex.slice(2);
}

// 0x-prefixed Ethereum hex → TRON Base58
export function tronHexToBase58(hexAddress: string): string {
  try {
    const cleanHex = hexAddress.startsWith('0x') ? hexAddress.slice(2) : hexAddress;
    if (cleanHex.length !== 40) {
      throw new Error('hex 주소는 20바이트(40자)여야 합니다');
    }
    return tronWeb.address.fromHex('41' + cleanHex);
  } catch (e) {
    throw new Error('TRON 주소 역변환 실패: ' + (e instanceof Error ? e.message : String(e)));
  }
}

/**
 * Encodes transferFrom function call for TRC20 contract using ethers v6 ABI encoder
 */
export function encodeTransferFrom(from: string, to: string, amount: string): string {
  try {
    const fromHex = tronHexToEthHex(from);
    const toHex = tronHexToEthHex(to);

    const abi = ['function transferFrom(address from, address to, uint256 value)'];
    const iface = new Interface(abi);
    return iface.encodeFunctionData('transferFrom', [fromHex, toHex, amount]);
  } catch (e) {
    throw new Error('ABI 인코딩 실패: ' + (e instanceof Error ? e.message : String(e)));
  }
}

/**
 * transfer 함수 인코딩
 */
export function encodeTransfer(to: string, amount: bigint | number): string {
  const toHex = tronAddressToHex(to);
  return trc20Interface.encodeFunctionData('transfer', [toHex, amount]);
}

/**
 * approve 함수 인코딩
 */
export function encodeApprove(spender: string, amount: bigint | number): string {
  const spenderHex = tronAddressToHex(spender);
  return trc20Interface.encodeFunctionData('approve', [spenderHex, amount]);
}

/**
 * allowance 함수 인코딩
 */
export function encodeAllowance(owner: string, spender: string): string {
  const ownerHex = tronAddressToHex(owner);
  const spenderHex = tronAddressToHex(spender);
  return trc20Interface.encodeFunctionData('allowance', [ownerHex, spenderHex]);
}

// Base58 → 0x-prefixed 20-byte Ethereum-compatible hex address
export  function tronAddressToEthHex(base58: string): string {
  try {
    const hex = TronWeb.address.toHex(base58); // 41 + 40자
    if (!hex.startsWith('41') || hex.length !== 42) {
      throw new Error(`잘못된 TRON hex 주소 형식: ${hex}`);
    }
    return '0x' + hex.slice(2); // ethers.js 호환
  } catch (e) {
    throw new Error('주소 변환 실패: ' + (e instanceof Error ? e.message : String(e)));
  }
}

// ✅ 디코딩 함수 예시 (transferFrom용)
export function decodeTransferFrom(encodedData: string): {
  from: string;
  to: string;
  amount: bigint;
} {
  const decoded = trc20Interface.decodeFunctionData('transferFrom', encodedData);
  const from = tronHexToBase58(decoded[0]);
  const to = tronHexToBase58(decoded[1]);
  const amount = decoded[2];
  return { from, to, amount };
}