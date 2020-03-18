import { Module } from '@nestjs/common';
import { neo4jProvider } from 'src/neo4j/neo4j.module';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';

@Module({
  imports: [],
  controllers: [NotesController],
  providers: [neo4jProvider, NotesService],
})
export class NotesModule {}
