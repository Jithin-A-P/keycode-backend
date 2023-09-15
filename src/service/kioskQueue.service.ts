import { KioskQMedia } from "../models/kioskQMedia.model";

export class KioskQService {
  queues: { [key: string]: KioskQMedia[] };

  constructor() {
    this.queues = {};
  }

  addToKioskQueue(kioskId: string, kioskMedia: KioskQMedia) {
    if (!this.queues[kioskId]) {
      this.queues[kioskId] = [];
    }
    this.queues[kioskId].push(kioskMedia);
  }

  getKioskQueue(kioskId: string) {
    return this.queues[kioskId];
  }
}
