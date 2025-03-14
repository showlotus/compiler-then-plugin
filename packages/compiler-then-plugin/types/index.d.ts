import * as WebSocket from 'ws';
import * as Webpack from 'webpack';
interface CompilerThenPluginOptions {
    /**
     * Port number of the internal websocket service
     *
     * default port is `3872`
     */
    port?: number;
    /**
     * Custom execute script, a JavaScript string
     *
     * default script is `location.reload()`
     */
    script?: string;
}
interface WebSocketServer extends WebSocket.Server {
    clients: Set<WebSocket>;
}
declare class CompilerThenPlugin {
    options: CompilerThenPluginOptions;
    wss: WebSocketServer;
    constructor(options?: CompilerThenPluginOptions);
    initServer(): Promise<void>;
    apply(compiler: Webpack.Compiler): Promise<void>;
}
export = CompilerThenPlugin;
