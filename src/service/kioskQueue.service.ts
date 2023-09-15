import { KioskQMedia, KioskQMediaType } from "../models/kioskQMedia.model";

export class KioskQServiceCls {
  queues: { [key: string]: KioskQMedia[] };
  qMediaCounter = 0;

  constructor() {
    this.queues = {};
  }

  addToKioskQ(kioskId: string, kioskMedia: KioskQMedia) {
    if (!this.queues[kioskId]) {
      this.queues[kioskId] = [];
    }
    const data = {
      id: ++this.qMediaCounter,
      ...kioskMedia,
    };
    this.queues[kioskId].push(data);
    return data;
  }

  addToKioskQFront(kioskId: string, kioskMedia: KioskQMedia) {
    if (!this.queues[kioskId]) {
      this.queues[kioskId] = [];
    }
    const data = {
      id: ++this.qMediaCounter,
      ...kioskMedia,
    };
    this.queues[kioskId].unshift(data);
    return data;
  }

  getKioskQ(kioskId: string) {
    return this.queues[kioskId];
  }

  getNextKioskQItem(kioskId: string) {
    const current = this.queues[kioskId][0];
    if (
      !(
        current.type === KioskQMediaType.GAME_ONE_PLAYER ||
        current.type === KioskQMediaType.GAME_TWO_PLAYERS ||
        current.type === KioskQMediaType.INSTANT_MEDIA
      )
    ) {
      this.queues[kioskId].push(current);
    }
    return this.queues[kioskId].shift();
  }
}

const KioskQService = new KioskQServiceCls();

export default KioskQService;
