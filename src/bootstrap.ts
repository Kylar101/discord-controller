  
import {Resolver} from "./package/injector";
import {RendererService} from "./package/services/renderer.service";

class DiBootstrap {

    static run() {
        console.log('---------------- | START | -----------------');

        // Static injector
        // const renderer = Injector.resolve<RendererService>(RendererService);
        // renderer.draw();

        const renderer: RendererService = Resolver.resolve<RendererService>(RendererService);
        renderer.draw();

        console.log('---------------- | END | -----------------');
    }
}

DiBootstrap.run();