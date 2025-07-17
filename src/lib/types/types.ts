// src/lib/types.ts
export interface EnergyUsageData {
  /** 날짜 (예: "2025-07-15") */
  day: string;

  /** 트랜잭션에 사용된 에너지 총량 */
  energy_usage: number;

  /** 에너지 소각량 */
  energy_burn: number;

  /** 원본 에너지 사용량 */
  origin_energy_usage: number;

  /** 전체 에너지 사용량 */
  energy_usage_total: number;

  /** 스마트컨트랙트 배포에 사용된 에너지 */
  energy_usage_as_deploy: number;
}

export interface EnergyUsageResponse {
  size: number;
  data: EnergyUsageData[];
}
