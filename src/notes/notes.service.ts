import { Injectable, Inject } from '@nestjs/common';
import { Note } from 'src/types/note.type';
import { Driver, Record } from 'neo4j-driver';

@Injectable()
export class NotesService {
  constructor(@Inject('Neo4j') private readonly inNeo4j: Driver) {}

  async findAllNotes(): Promise<Note[]> {
    const { records } = await this.inNeo4j
      .session()
      .run('MATCH (n: Note) RETURN n');

    return records.map((item: Record) => {
      const note = item.get(0).properties as Note;
      return note;
    });
  }
}
