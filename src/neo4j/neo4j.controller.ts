import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { Neo4jService } from './neo4j.service';
import { Card } from 'src/types/card.type';
import { v4 as uuidv4 } from 'uuid';
import { Note } from 'src/types/note.type';

@Controller('neo4j')
export class Neo4jController {
  constructor(private readonly neoServ: Neo4jService) {}

  @Get()
  async findAll() {
    console.log(`retriving nodes`);
    const all = await this.neoServ.findAll();
    console.log(all[0].hostname);
    return all;
  }

  @Get('notes')
  async findNotes() {
    console.log(`retriving notes`);
    const all = await this.neoServ.findAllNotes();
    console.log(all[0].related);
    return all;
  }

  @Get(':id')
  async findNote(@Param('id') id: string) {
    console.log(`retriving note cards`);
    const note = await this.neoServ.findNote(id);
    note.related.forEach(item => {
      item.type = item.constructor.name;
    });
    return note;
  }

  @Post()
  async createCard(@Body() createCardDto: Card) {
    if (!createCardDto.id) createCardDto.id = uuidv4();
    await this.neoServ.createCard(createCardDto);
    return `${createCardDto.title} Created !`;
  }

  @Post('notes')
  async createNote(@Body() noteDto: Note) {
    if (!noteDto.id) noteDto.id = uuidv4();
    await this.neoServ.createNote(noteDto);
    return `${noteDto.title} Created !`;
  }
}
