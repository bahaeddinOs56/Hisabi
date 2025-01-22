export const IMAGES = {
    tangier: '/tangier.jpg',
    casablanca: '/casablanca.jpg',
    sale: '/sale.jpg',
    chaouen: '/chaouen.jpg',
    nador: '/nador.jpg',
    marrakech: '/marrakech.jpg',
    sahara: '/sahara.jpg'
  } as const
  
  export type ImageKey = keyof typeof IMAGES
  
  