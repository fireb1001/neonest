import { Controller, Get, Param } from '@nestjs/common';
import { NotesService } from './notes.service';
import { v4 as uuidv4 } from 'uuid';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesServ: NotesService) {}
  @Get()
  async findNotes() {
    console.log(`findNotes`);
    const all = await this.notesServ.findAllNotes();
    return all;
  }

  @Get(':id')
  async findNote(@Param('id') id: string) {
    console.log(`retriving note cards`);
    const note = await this.notesServ.findNote(id);
    note.related.forEach(item => {
      item.type = item.constructor.name;
    });
    return note;
  }

  @Post('notes')
  async createNote(@Body() noteDto: Note) {
    if (!noteDto.id) noteDto.id = uuidv4();
    await this.notesServ.createNote(noteDto);
    return `${noteDto.title} Created !`;
  }
}
