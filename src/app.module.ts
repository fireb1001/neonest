import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Neo4jController } from './neo4j/neo4j.controller';
import { Neo4jService } from './neo4j/neo4j.service';
import { Neo4jModule } from './neo4j/neo4j.module';

@Module({
  imports: [Neo4jModule],
  controllers: [AppController, Neo4jController],
  providers: [AppService, Neo4jService],
})
export class AppModule {}
