import { Component } from '@angular/core';

// Capacitor
import {
  FilesystemDirectory,
  Plugins,
} from '@capacitor/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  currentDirectory = '';
  fs = Plugins.Filesystem;
  files = [];
  systemDirectories: FilesystemDirectory[] = [
    FilesystemDirectory.Cache,
    FilesystemDirectory.Data,
    FilesystemDirectory.Documents,
    FilesystemDirectory.External,
    FilesystemDirectory.ExternalStorage,
  ];

  constructor() {}

  async readdir(directory: FilesystemDirectory) {
    this.currentDirectory = directory;
    this.files = [];
    try {
      const dir = await this.fs.readdir({
        directory,
        path: '/',
      });
      this.files = dir.files;
      console.log(`Filesystem.readdir() - files:`, this.files);
    } catch (err) {
      console.error(`Filesystem.readdir() - Failure`, err);
    }
  }
}
