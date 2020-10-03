import 'reflect-metadata';

export class Injector {
  private depInstances: Map<string, any> = new Map<string, any>();

  static resolve<T>(target: any): T {
    const tokens = Reflect.getMetadata('design:paramtypes', target) || [];
    const injections = tokens.map((token: any) => Injector.resolve<any>(token));
    return new target(...injections);
  }

  command(target: any) {
    if (this.depInstances && this.depInstances.has(target.name)) {
      return this.depInstances.get(target.name);
    }

    const tokens = Reflect.getMetadata('design:paramtypes', target) || [];
    const injections = tokens.map((token: any) => Resolver.resolve<any>(token));
    this.depInstances.set(target.name, target);

    return new target(...injections);
  }

  resolve<T>(target: any): any {
    if (this.depInstances && this.depInstances.has(target.name)) {
      return this.depInstances.get(target.name);
    }

    const tokens = Reflect.getMetadata('design:paramtypes', target) || [];
    const injections = tokens.map((token: any) => Resolver.resolve<T>(token));
    this.depInstances.set(target.name, target);

    return new target(...injections);
  }
}

export const Resolver = new Injector();