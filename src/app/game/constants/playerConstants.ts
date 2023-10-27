import { IPlayerColor } from '../types/playerTypes';

export const PLAYER_COLORS: IPlayerColor[] = [
  {
    name: 'red',
    hex: '#d80000'
  },
  {
    name: 'blue',
    hex: '#201cff'
  },
  {
    name: 'green',
    hex: '#19d400'
  },
  {
    name: 'yellow',
    hex: '#fff831'
  }
];

export const PLAYERS = [
  {
    userId: 1,
    color: 'red',
    active: true,
    figures: [
      {
        position: 0,
        config: {
          stepOutPosition: 1,
          positionType: 'IN_HOUSE'
        }
      },
      {
        position: 0,
        config: {
          stepOutPosition: 1,
          positionType: 'IN_HOUSE'
        }
      },
      {
        position: 0,
        config: {
          stepOutPosition: 1,
          positionType: 'IN_HOUSE'
        }
      },
      {
        position: 0,
        config: {
          stepOutPosition: 1,
          positionType: 'IN_HOUSE'
        }
      }
    ]
  },
  {
    userId: 2,
    color: 'blue',
    active: false,
    figures: [
      {
        position: 0,
        config: {
          stepOutPosition: 5,
          positionType: 'IN_HOUSE'
        }
      },
      {
        position: 0,
        config: {
          stepOutPosition: 5,
          positionType: 'IN_HOUSE'
        }
      },
      {
        position: 0,
        config: {
          stepOutPosition: 5,
          positionType: 'IN_HOUSE'
        }
      },
      {
        position: 0,
        config: {
          stepOutPosition: 5,
          positionType: 'IN_HOUSE'
        }
      }
    ]
  },
  {
    userId: 3,
    color: 'green',
    active: false,
    figures: [
      {
        position: 0,
        config: {
          stepOutPosition: 9,
          positionType: 'IN_HOUSE'
        }
      },
      {
        position: 0,
        config: {
          stepOutPosition: 9,
          positionType: 'IN_HOUSE'
        }
      },
      {
        position: 0,
        config: {
          stepOutPosition: 9,
          positionType: 'IN_HOUSE'
        }
      },
      {
        position: 0,
        config: {
          stepOutPosition: 9,
          positionType: 'IN_HOUSE'
        }
      }
    ]
  },
  {
    userId: 4,
    color: 'yellow',
    active: false,
    figures: [
      {
        position: 0,
        config: {
          stepOutPosition: 13,
          positionType: 'IN_HOUSE'
        }
      },
      {
        position: 0,
        config: {
          stepOutPosition: 13,
          positionType: 'IN_HOUSE'
        }
      },
      {
        position: 0,
        config: {
          stepOutPosition: 13,
          positionType: 'IN_HOUSE'
        }
      },
      {
        position: 0,
        config: {
          stepOutPosition: 13,
          positionType: 'IN_HOUSE'
        }
      }
    ]
  }
];
