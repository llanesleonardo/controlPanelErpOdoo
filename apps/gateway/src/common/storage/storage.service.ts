import { Injectable, OnModuleInit } from '@nestjs/common';
import { existsSync, mkdirSync, writeFileSync, accessSync, constants } from 'fs';
import { join, normalize, resolve, sep } from 'path';

@Injectable()
export class StorageService implements OnModuleInit {
  private root = resolve(process.env.STORAGE_ROOT ?? './storage/local');

  onModuleInit() {
    this.ensureDir(this.root);
    this.ensureDir(join(this.root, 'evidence'));
    this.ensureDir(join(this.root, 'backups'));
  }

  getRoot(): string {
    return this.root;
  }

  isWritable(): boolean {
    try {
      accessSync(this.root, constants.W_OK);
      return true;
    } catch {
      return false;
    }
  }

  /** Resolve a path under STORAGE_ROOT; throws if traversal escapes root. */
  safeJoin(...parts: string[]): string {
    const candidate = normalize(join(this.root, ...parts));
    const rootWithSep = this.root.endsWith(sep) ? this.root : this.root + sep;
    if (candidate !== this.root && !candidate.startsWith(rootWithSep)) {
      throw new Error('Path escapes STORAGE_ROOT');
    }
    return candidate;
  }

  writeEvidenceJson(
    correlationId: string,
    filename: string,
    data: unknown,
  ): string {
    const safeId = correlationId.replace(/[^a-zA-Z0-9._-]/g, '_');
    const dir = this.safeJoin('evidence', safeId);
    this.ensureDir(dir);
    const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
    const file = this.safeJoin('evidence', safeId, safeName);
    writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
    return file;
  }

  private ensureDir(path: string) {
    if (!existsSync(path)) {
      mkdirSync(path, { recursive: true });
    }
  }
}
