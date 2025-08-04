import { Injectable } from '@nestjs/common';

export interface EnvironmentConfig {
  // Database
  DATABASE_URL: string;
  
  // JWT
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  
  // Server
  PORT: number;
  NODE_ENV: 'development' | 'production' | 'test';
  
  // Supabase (if you're using it)
  SUPABASE_URL?: string;
  SUPABASE_KEY?: string;
  
  // Other services
  REDIS_URL?: string;
  SMTP_HOST?: string;
  SMTP_PORT?: number;
  SMTP_USER?: string;
  SMTP_PASS?: string;
}

@Injectable()
export class EnvConfigService {
  private readonly config: EnvironmentConfig;

  constructor() {
    this.config = this.validateConfig();
  }

  private validateConfig(): EnvironmentConfig {
    const requiredEnvVars = [
      'DATABASE_URL',
      'JWT_SECRET',
      'PORT',
      'NODE_ENV'
    ];

    for (const envVar of requiredEnvVars) {
      if (!process.env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
      }
    }

    return {
      DATABASE_URL: process.env.DATABASE_URL!,
      JWT_SECRET: process.env.JWT_SECRET!,
      JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '24h',
      PORT: parseInt(process.env.PORT!, 10),
      NODE_ENV: process.env.NODE_ENV as 'development' | 'production' | 'test',
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_KEY: process.env.SUPABASE_KEY,
      REDIS_URL: process.env.REDIS_URL,
      SMTP_HOST: process.env.SMTP_HOST,
      SMTP_PORT: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : undefined,
      SMTP_USER: process.env.SMTP_USER,
      SMTP_PASS: process.env.SMTP_PASS,
    };
  }

  // Database
  get databaseUrl(): string {
    return this.config.DATABASE_URL;
  }

  // JWT
  get jwtSecret(): string {
    return this.config.JWT_SECRET;
  }

  get jwtExpiresIn(): string {
    return this.config.JWT_EXPIRES_IN;
  }

  // Server
  get port(): number {
    return this.config.PORT;
  }

  get nodeEnv(): string {
    return this.config.NODE_ENV;
  }

  get isDevelopment(): boolean {
    return this.config.NODE_ENV === 'development';
  }

  get isProduction(): boolean {
    return this.config.NODE_ENV === 'production';
  }

  get isTest(): boolean {
    return this.config.NODE_ENV === 'test';
  }

  // Supabase
  get supabaseUrl(): string | undefined {
    return this.config.SUPABASE_URL;
  }

  get supabaseKey(): string | undefined {
    return this.config.SUPABASE_KEY;
  }

  // Redis
  get redisUrl(): string | undefined {
    return this.config.REDIS_URL;
  }

  // SMTP
  get smtpHost(): string | undefined {
    return this.config.SMTP_HOST;
  }

  get smtpPort(): number | undefined {
    return this.config.SMTP_PORT;
  }

  get smtpUser(): string | undefined {
    return this.config.SMTP_USER;
  }

  get smtpPass(): string | undefined {
    return this.config.SMTP_PASS;
  }

  // Get all config (useful for testing or debugging)
  getAll(): EnvironmentConfig {
    return { ...this.config };
  }
} 