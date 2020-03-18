import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Neo4jController } from './neo4j/neo4j.controller';
import { Neo4jService } from './neo4j/neo4j.service';
import { Neo4jModule } from './neo4j/neo4j.module';
import { NotesService } from './notes/notes.service';
import { NotesController } from './notes/notes.controller';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [Neo4jModule, NotesModule],
  controllers: [AppController, Neo4jController, NotesController],
  providers: [AppService, Neo4jService, NotesService],
})
export class AppModule {}
