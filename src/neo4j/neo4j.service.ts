import { Injectable, Inject } from '@nestjs/common';
import { Record, Driver, Path } from 'neo4j-driver';
import { Card, CardDto } from 'src/types/card.type';
import { Note } from 'src/types/note.type';
import { TagDto } from 'src/types/tag.type';

@Injectable()
export class Neo4jService {
  constructor(@Inject('Neo4j') private readonly inNeo4j: Driver) {}

  async findAll(): Promise<Card[]> {
    const { records } = await this.inNeo4j
      .session()
      .run('MATCH (n) RETURN n LIMIT 5');
    return records.map((item: Record) => item.get(0).properties as Card);
  }

  async findAllNotes(): Promise<Note[]> {
    const { records } = await this.inNeo4j
      .session()
      .run('MATCH (n: Note) RETURN n');

    return records.map((item: Record) => {
      const note = item.get(0).properties as Note;
      return note;
    });
  }

  async findNote(id: string): Promise<Note> {
    const related = [];

    const { records } = await this.inNeo4j
      .session()
      .run('MATCH p=(n: Note {id: $id })-[r]->(any) RETURN p', {
        id: id,
      });

    const note = (records[0].get(0) as Path).start.properties as Note;
    records.forEach(record => {
      const path = record.get(0) as Path;

      console.log(path.segments[0].relationship.type);

      switch (path.end.labels[0]) {
        case 'Card':
          related.push(new CardDto(path.end.properties));
          break;
        case 'Tag':
          related.push(new TagDto(path.end.properties));
          break;
        default:
          related.push(path.end.properties);
      }
    });
    note.related = related;
    return note;
  }

  async createCard(card: Card): Promise<any> {
    const done = await this.inNeo4j
      .session()
      .run(`Create (:Card $props)`, { props: card });
    console.log(done);
  }

  async createNote(note: Note): Promise<any> {
    const done = await this.inNeo4j
      .session()
      .run(`Create (:Note $props)`, { props: note });
    console.log(done);
  }
}
