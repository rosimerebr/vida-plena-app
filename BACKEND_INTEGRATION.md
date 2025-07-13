# Backend Integration - Vida Plena App

## Endpoint para Receber Hábitos

### POST /report

**URL:** `http://localhost:3000/report`

**Método:** POST

**Headers:**
```
Content-Type: application/json
```

**Body (Array de hábitos):**
```json
[
  {
    "userId": "default-user",
    "habit": "Sunlight",
    "date": "2024-01-15"
  },
  {
    "userId": "default-user", 
    "habit": "Water",
    "date": "2024-01-15"
  }
]
```

**Exemplo de resposta de sucesso:**
```json
{
  "message": "Habits saved successfully",
  "count": 2
}
```

**Exemplo de resposta de erro:**
```json
{
  "error": "Failed to save habits",
  "message": "Database connection error"
}
```

## Implementação no Backend (NestJS)

### Controller (report.controller.ts)
```typescript
import { Controller, Post, Body } from '@nestjs/common';
import { ReportService } from './report.service';

interface HabitReport {
  userId: string;
  habit: string;
  date: string;
}

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  async saveHabits(@Body() habits: HabitReport[]) {
    return this.reportService.saveHabits(habits);
  }

  @Get()
  async getWeeklyReport() {
    return this.reportService.getWeeklyReport();
  }
}
```

### Service (report.service.ts)
```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HabitLog } from './entities/habit-log.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(HabitLog)
    private habitLogRepository: Repository<HabitLog>,
  ) {}

  async saveHabits(habits: HabitReport[]) {
    try {
      const habitLogs = habits.map(habit => ({
        userId: habit.userId,
        habit: habit.habit,
        date: habit.date,
        createdAt: new Date()
      }));

      await this.habitLogRepository.save(habitLogs);
      
      return {
        message: 'Habits saved successfully',
        count: habits.length
      };
    } catch (error) {
      throw new Error('Failed to save habits');
    }
  }

  async getWeeklyReport() {
    // Implementation for getting weekly report
    return this.habitLogRepository.find({
      where: {
        date: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        }
      }
    });
  }
}
```

### Entity (habit-log.entity.ts)
```typescript
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class HabitLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  habit: string;

  @Column()
  date: string;

  @CreateDateColumn()
  createdAt: Date;
}
```

## Configuração CORS

Certifique-se de que o CORS está habilitado no backend:

```typescript
// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: 'http://localhost:4200', // Angular dev server
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  await app.listen(3000);
}
bootstrap();
```

## Testando a Integração

1. Inicie o backend NestJS na porta 3000
2. Inicie o frontend Angular na porta 4200
3. Acesse a página de hábitos e marque alguns hábitos
4. Clique em "Save" - os hábitos serão enviados para o backend
5. Verifique os logs do backend para confirmar o recebimento
6. Acesse a página de relatório para ver os dados salvos 