import { Ctr } from '../types';

type ClassDecorator<T> = (target: T) => void;

export function Command<TCommand>(): ClassDecorator<Ctr<TCommand>> {
  return (target: Ctr<TCommand>) => {
    console.log('inside: Command decorator');
    console.log(`${target.name} is used`);
  };
}

