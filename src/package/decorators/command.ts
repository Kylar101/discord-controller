import { Ctr } from '../types';

type ClazzDecorator<T> = (target: T) => void;

export function Command<TCommand>(): ClazzDecorator<Ctr<TCommand>> {
  return (target: Ctr<any>) => {
    console.log('inside: Command decorator');
    console.log(`${target.name} is used`);
  };
}

