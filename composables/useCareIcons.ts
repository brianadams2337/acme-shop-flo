import { filename } from 'pathe/utils'

const symbolMap: Record<number, string> = {
  720: 'machine_wash_30_gentle_or_delicate',
  741: 'machine_wash_30_permanent_press',
  739: 'machine_wash_30',
  721: 'machine_wash_40_gentle_or_delicate',
  723: 'machine_wash_40_permanent_press',
  724: 'machine_wash_40',
  722: 'machine_wash_60_permanent_press',
  730: 'machine_wash_60',
  719: '', // 95 °C pflegeleichte Wäsche
  728: 'machine_wash_95',
  743: 'bleach_if_needed',
  736: 'oxygen_bleach_if_needed',
  731: 'iron',
  734: 'hand_wash',
  746: 'iron_high',
  725: 'dry_flat',
  738: 'iron_medium',
  // 744: '', // nicht auswringen
  757: 'do_not_bleach',
  750: 'do_not_iron',
  727: 'do_not_dry_clean',
  726: 'iron_low',
  // 729: '', //Nicht mit Dampf bügeln
  762: 'do_not_tumble_dry',
  733: 'do_not_wash',
  754: '', // Schonend reinigen mit Kohlenwasserstofflösungsmittel
  732: '', // Schonend reinigen mit Perchlorethylen
  758: '', // Trockenreinigung
  751: '', // Trockenreinigung mit Kohlenwasserstofflösungsmittel
  753: '', // Trockenreinigung mit Perchlorethylen
  737: 'tumble_dry_at_low_temperature',
  745: 'tumble_dry_at_normal_temperature',
  768: 'tumble_dry',
  777: 'drip_dry',
}

const assets = import.meta.glob('~/assets/icons/care/**/*', {
  eager: true,
})

const images = Object.fromEntries(
  Object.entries(assets).map(([key, value]) => [
    filename(key),
    (value as any).default,
  ]),
)

export function useCareIcons() {
  return {
    iconComponent(iconId: number): Function | undefined {
      if (iconId === -1 || !Object.keys(images).length) {
        return undefined
      }
      return images[symbolMap[iconId]]?.render ?? undefined
    },
  }
}
