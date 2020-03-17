import { Injectable, Inject } from '@nestjs/common';
import neo4j from 'neo4j-driver';
import Driver from 'neo4j-driver/lib/driver.js'

@Injectable()
export class Neo4jService {
    constructor(@Inject("Neo4j") private readonly inNeo4j: Driver) {}
    async findAll(): Promise<any> {
        let {records} = await this.inNeo4j.session().run('MATCH (n) RETURN n LIMIT 5');
        console.log(records);
        // TODO map records
        return records;
    }
}
