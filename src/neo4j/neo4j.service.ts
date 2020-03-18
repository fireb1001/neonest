import { Injectable, Inject } from '@nestjs/common';
import { Record, Driver } from 'neo4j-driver';
import { Card } from 'src/types/card.type';

@Injectable()
export class Neo4jService {
  constructor(@Inject('Neo4j') private readonly inNeo4j: Driver) {}

  async findAll(): Promise<Card[]> {
    const { records } = await this.inNeo4j
      .session()
      .run('MATCH (n) RETURN n LIMIT 5');
    return records.map((item: Record) => item.get(0).properties as Card);
  }

  async createCard(card: Card): Promise<any> {
    const done = await this.inNeo4j
      .session()
      .run(`Create (:Card $props)`, { props: card });
    console.log(done);
  }
}
