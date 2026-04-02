// argon2.d.ts
// Заглушка для импорта verify из argon2, если типы не подтянутся автоматически
export function verify(hash: string, plain: string): Promise<boolean>;
