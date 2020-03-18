import { Controller, Get } from '@nestjs/common';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesServ: NotesService) {}
  @Get()
  async findNotes() {
    console.log(`findNotes`);
    const all = await this.notesServ.findAllNotes();
    return all;
  }
}
